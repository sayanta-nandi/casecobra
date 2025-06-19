import { ReactNode } from "react";
import { Label as LabelSCN } from "@/components/ui/label";

const Label = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <LabelSCN className={`tracking-tight text-lg ${className}`}>
      {children}
    </LabelSCN>
  );
};
export default Label;
