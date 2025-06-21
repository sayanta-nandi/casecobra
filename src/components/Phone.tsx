import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PhonePropes extends HTMLAttributes<HTMLDivElement> {
  imgScr: string;
  dark?: boolean;
}

const Phone = ({ imgScr, dark = false, className, ...props }: PhonePropes) => {
  return (
    <div
      className={cn(
        "rounded-[39px] relative pointer-events-none z-20 overflow-hidden",
        className
      )}
      {...props}
    >
      <Image
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        className="object-fill pointer-events-none z-20 select-none"
        alt="phone template"
        fill
      />
      <div className="absolute -z-10 inset-0">
        <Image
          className="h-full object-cover"
          src={imgScr}
          alt="phone image"
          fill
        />
      </div>
    </div>
  );
};

export default Phone;
