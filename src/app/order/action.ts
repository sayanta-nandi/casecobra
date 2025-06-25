"use server";

import { prisma } from "@/utils/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getOrders = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.email || !user.id) {
    throw new Error("User not authenticated");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
      isPaid: true,
    },
    include: {
      configurator: true,
    },
  });

  return orders;
};
