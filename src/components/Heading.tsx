import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Heading = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h1
      className={cn(
        "relative text-5xl text-balance tracking-tighter font-bold leading-tight text-center",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Heading;
