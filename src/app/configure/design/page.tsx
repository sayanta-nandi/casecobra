import { prisma } from "@/utils/client";
import { notFound } from "next/navigation";
import DesignConfigurator from "./components/DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") return notFound();

  const config = await prisma.configarator.findUnique({
    where: { id },
  });

  if (!config) return notFound();

  const { width, height, imageUrl } = config;

  return (
    <DesignConfigurator
      configId={id}
      imageUrl={imageUrl}
      dimensions={{ height, width }}
    />
  );
};

export default Page;
