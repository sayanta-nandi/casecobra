import Phone from "@/components/Phone";
import { prisma } from "@/utils/client";
import { notFound } from "next/navigation";
import SummaryDesign from "./components/SummaryDesign";
import { PageProps } from "@/lib/interfaces";

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
