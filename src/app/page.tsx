import FiveStar from "@/components/FiveStar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Image } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper
          className="pb-32 px-20 pt-10 lg:pb-52 lg:pt-24 xl:pt-32
      lg:gap-x-0 xl:gap-x-8"
        >
          <div
            className="relative mx-auto col-span-2 flex flex-col items-center
          text-center w-full gap-4"
          >
            <h1
              className="relative text-5xl text-balance tracking-tighter 
             font-bold !leading-tight w-full
            "
            >
              {" "}
              Your Image on a{" "}
              <span
                className="bg-green-600
              px-2 text-white rounded"
              >
                Custom
              </span>{" "}
              Phone Case
            </h1>
            <p className="text-balance">
              Capture your favorite memories with your own,{" "}
              <span
                className="font-bold
              "
              >
                one-of-one
              </span>{" "}
              phone case. CaseCobra allows you to protect your memories, not
              just your phone case.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start pt-5 gap-1">
              <div className="flex gap-2">
                <Check className="text-green-500" />
                <p>High-quality, durable material</p>
              </div>
              <div className="flex gap-2">
                <Check className="text-green-500" />
                <p>5 year print guarantee</p>
              </div>
              <div className="flex gap-2">
                <Check className="text-green-500" />
                <p>Modern iPhone models supported</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center pt-10">
            <div className="flex justify-center -space-x-3 select-none">
              <img
                src="happy1.avif"
                className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
              />
              <img
                src="happy2.jpg"
                className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
              />
              <img
                src="happy3.jpg"
                className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
              />
              <img
                src="happy4.jpg"
                className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
              />
              <img
                src="happy5.jpg"
                className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
              />
            </div>
            <div className="flex flex-col items-center">
              <FiveStar />
              <p>
                <span className="font-semibold">1,250+</span> happy customers
              </p>
            </div>
          </div>
          <div className="pt-10">
            <Image />
          </div>
          <div className="w-90 h-[1000px] bg-green-600"></div>
          <div className="pt-16 flex flex-col items-center md:flex-row md:gap-4">
            <p className="font-bold text-5xl text-center order-2">
              What Our Customers think?
            </p>
            <img
              src="butterfly.png"
              className="bg-inherit size-44 order-1 md:order-3"
            />
          </div>
          <div className="flex flex-col pt-16 gap-10 lg:flex-row">
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="happy3.jpg"
                  className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
                />
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-lg">Laura</p>
                  <div className="flex items-center gap-1">
                    <Check className="text-green-600" />
                    Verified Purchase
                  </div>
                </div>
              </div>
              <FiveStar />
              <p className="text-lg text-wrap">
                "The case feels durable and I even got a compliment on the
                design. Had the case for two and a half months now and{" "}
                <span className="bg-green-600 text-white px-1">
                  the image is super clear,
                </span>{" "}
                on the case I had before, the image started fading into
                yellow-ish color after a couple weeks. Love it."
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="happy4.jpg"
                  className="relative rounded-full size-14 ring-2 ring-slate-100
                object-cover"
                />
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-lg">Peter</p>
                  <div className="flex items-center gap-1">
                    <Check className="text-green-600" />
                    Verified Purchase
                  </div>
                </div>
              </div>
              <FiveStar />
              <p className="text-lg text-wrap">
                "I usually keep my phone together with my keys in my pocket and
                that led to some pretty heavy scratchmarks on all of my last
                phone cases. This one, besides a barely noticeable scratch on
                the corner,{" "}
                <span className="bg-green-600 text-white px-1">
                  looks brand new after about half a year.
                </span>{" "}
                I dig it."
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
