import { Suspense } from "react";
import ThankYou from "./ThankYou";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = () => {
  return (
    <Suspense>
      <MaxWidthWrapper>
        <ThankYou />
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default Page;
