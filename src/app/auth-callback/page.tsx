"use client";

import { useQuery } from "@tanstack/react-query";
import { handleUser } from "./action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const page = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await handleUser(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    const id = localStorage.getItem("configurationId");
    if (id) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${id}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Loader
      title="Logging you in..."
      massage="You will be redirected automatically."
    />
  );
};
export default page;
