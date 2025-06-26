import { stripe } from "@/lib/stripe";
import { prisma } from "@/utils/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import OrderReceivedEmail from "@/components/email/OrderReceivedEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.text();
    console.log("Received webhook:", body);

    const signature = req.headers.get("stripe-signature");
    console.log("signature: ", signature);

    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.WEBHOOK_SECRET!
    );
    console.log("event: ", event);

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email)
        throw new Error("No email found");

      const session = event.data.object as Stripe.Checkout.Session;

      const { userId, orderId } = session.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Missing userId or orderId in session metadata");
      }

      const billingAddress = session.customer_details?.address;

      const updateOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shipping_address: {
            create: {
              name: session.customer_details?.email!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              postalCode: billingAddress?.postal_code!,
              state: billingAddress?.state,
              street: billingAddress?.line1!,
            },
          },
          billing_address: {
            create: {
              name: session.customer_details?.name!,
              city: billingAddress?.city!,
              country: billingAddress?.country!,
              postalCode: billingAddress?.postal_code!,
              state: billingAddress?.state,
              street: billingAddress?.line1!,
            },
          },
        },
      });

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [event.data.object.customer_details?.email],
        subject: "Thanks for your order!",
        react: OrderReceivedEmail({
          orderId,
          orderDate: updateOrder.createdAt.toLocaleDateString(),
          // @ts-ignore
          shippingAddress: {
            name: session.customer_details!.name!,
            city: billingAddress!.city!,
            country: billingAddress!.country!,
            postalCode: billingAddress!.postal_code!,
            street: billingAddress!.line1!,
            state: billingAddress!.state,
          },
        }),
      });
    }
    return NextResponse.json({ result: event, ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong", ok: false },
      { status: 500 }
    );
  }
}
