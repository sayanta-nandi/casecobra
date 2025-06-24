"use server";

import { prisma } from "@/utils/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async (orderId: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email || !user.id) {
    throw new Error("User not authenticated");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      billing_address: true,
      shipping_address: true,
      configurator: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
