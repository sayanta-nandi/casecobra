"use server";

import { prisma } from "@/utils/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  BASE_PRICE,
  PRODUCT_PRICES,
} from "../../../../../config/product-price-validator";
import { Order } from "@prisma/client/edge";
import { stripe } from "@/lib/stripe";

export async function createCheckoutSession({
  configId,
}: {
  configId: string;
}) {
  const config = await prisma.configarator.findUnique({
    where: { id: configId },
  });
  if (!config) throw new Error("No config found");
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("User not found");

  let price = BASE_PRICE;
  const { material, finish } = config;

  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;

  let order: Order | undefined = undefined;

  const existingOrder = await prisma.order.findFirst({
    where: {
      configaratorId: configId,
      userId: user.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await prisma.order.create({
      data: {
        userId: user.id,
        configaratorId: configId,
        price,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iphone case",
    images: [config.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${config.id}`,
    payment_method_types: ["card", "amazon_pay"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["DE", "US", "IN"] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  return { url: stripeSession.url };
}
