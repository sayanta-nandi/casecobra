"use server";

import { prisma } from "@/utils/client";
import { OrderStatus } from "@prisma/client/edge";

export const updateStatus = async ({
  orderId,
  updatedStatus,
}: {
  orderId: string;
  updatedStatus: OrderStatus;
}) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: updatedStatus,
    },
  });
};
