"use client";

import { useQuery } from "@tanstack/react-query";
import { handleUser } from "./action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const page = () => {
  const [configId, setConfigId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("configurationId");
    if (id) setConfigId(id);
  }, []);

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await handleUser(),
    retry: 5,
    retryDelay: 500,
  });

  if (data?.success) {
    if (configId) {
      localStorage.removeItem("configurationId");
      router.push(`/configure/preview?id=${configId}`);
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
