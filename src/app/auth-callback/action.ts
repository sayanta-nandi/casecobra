"use server";

import { prisma } from "@/utils/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function handleUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("invalid user data");
  }

  const existingUser = await prisma.user.findFirst({
    where: { id: user.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: user.email,
        id: user.id,
      },
    });
  }

  console.log("returning true");

  return { success: true };
}
