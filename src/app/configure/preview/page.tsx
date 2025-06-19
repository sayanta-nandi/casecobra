import Phone from "@/components/Phone";
import { prisma } from "@/utils/client";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <Phone imgScr={config.croppedImageUrl!} className="w-64" />
      <p>image: {config.croppedImageUrl}</p>
      <p>color: {config.color}</p>
      <p>material: {config.material}</p>
      <p>finish: {config.finish}</p>
      <p>model: {config.model}</p>
    </div>
  );
};
export default Page;
