"use client";

import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import Phone from "./Phone";
import Image from "next/image";

const PHONES = [
  "/previews/preview1.png",
  "/previews/preview2.png",
  "/previews/preview3.png",
  "/previews/preview4.png",
  "/previews/preview5.png",
  "/previews/preview6.png",
  "/previews/preview7.png",
  "/previews/preview8.png",
  "/previews/preview9.png",
  "/previews/preview10.png",
  "/previews/preview11.png",
  "/previews/preview12.png",
];

const splitColumns = (
  arr: Array<string>,
  col: number
): Array<Array<string>> => {
  const result: Array<Array<string>> = [];
  const row = Math.ceil(arr.length / col);
  for (let i = 0; i < arr.length; i += row) {
    result.push(arr.slice(i, i + row));
  }
  return result;
};

const ReviewCol = ({
  phones,
  className,
  msPerPx = 0,
  reviewClassName,
}: {
  phones: Array<string>;
  className?: string;
  msPerPx?: number;
  reviewClassName?: (reviewIndex: number) => string;
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${msPerPx * columnHeight}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const observer = new ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight || 0);
    });
    observer.observe(columnRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={columnRef}
      className={`animate-marquee space-y-8 py-4 ${className}`}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {phones.concat(phones).map((phone, idx) => (
        <div
          style={{
            width: 76 * 4 + "px",
            height: ((64 * 1831) / 896 + 12) * 4 + "px",
          }}
          key={idx}
          className={`animate-fade-in opacity-0 rounded-[2.25rem] bg-white flex justify-center items-center shadow-xl shadow-slate-900/5 ${
            reviewClassName ? reviewClassName(idx % phones.length) : ""
          }`}
        >
          <Phone width={64} imgScr={phone} />
        </div>
      ))}
    </div>
  );
};

const ReviewGrid = () => {
  const animatedRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(animatedRef, { once: true, amount: 0.2 });
  const columns = splitColumns(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitColumns(columns[2], 2);

  return (
    <div className="relative flex flex-col items-center" ref={animatedRef}>
      {isInView && (
        <div className="grid grid-cols-1 max-h-[125vh] overflow-hidden md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 lg:px-16">
          <ReviewCol
            phones={[...column1, ...column3.flat(), ...column2]}
            msPerPx={10}
            reviewClassName={(idx) => {
              if (idx >= column1.length + column3[0].length) return "md:hidden";
              if (idx >= column1.length) return "lg:hidden";
              return "";
            }}
          />
          <ReviewCol
            phones={[...column2, ...column3[1]]}
            msPerPx={15}
            className="hidden md:block"
            reviewClassName={(idx) => {
              if (idx >= column2.length) return "lg:hidden";
              return "";
            }}
          />
          <ReviewCol
            phones={column3.flat()}
            msPerPx={12}
            className="hidden lg:block"
          />
        </div>
      )}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-200" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-200" />
    </div>
  );
};

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative">
      <ReviewGrid />
      <Image
        width={56 * 4}
        height={(56 * 4 * 720) / 870}
        alt=""
        src="/OurProducts.png"
        className="absolute w-56 top-1/3 hidden lg:block -right-36"
      />
    </MaxWidthWrapper>
  );
};

export default Reviews;
