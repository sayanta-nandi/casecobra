import Phone from "@/components/Phone";
import { prisma } from "@/utils/client";
import { notFound } from "next/navigation";
import SummaryDesign from "./components/SummaryDesign";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams;
  if (!id || typeof id !== "string") return notFound();

  const config = await prisma.configarator.findUnique({
    where: {
      id,
    },
  });

  if (!config) return notFound();

  return <SummaryDesign config={config} />;
};
export default Page;
