import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PhonePropes extends HTMLAttributes<HTMLDivElement> {
  imgScr: string;
  dark?: boolean;
  width: number;
}

const Phone = ({
  imgScr,
  dark = false,
  width,
  className,
  ...props
}: PhonePropes) => {
  return (
    <div
      style={{
        width: width * 4 + "px",
        height: (width * 4 * 1831) / 896 + "px",
        borderRadius: (width * 39) / 64 + "px",
      }}
      className={cn(
        "relative pointer-events-none z-20 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        fill
        alt=""
        src="/phone-template-white-edges.png"
        className="object-fill pointer-events-none z-20 select-none"
      />
      <div className="absolute -z-10 inset-0">
        <Image fill className="h-full object-cover" alt="" src={imgScr} />
      </div>
    </div>
  );
};

export default Phone;
