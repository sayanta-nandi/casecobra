"use client";

import Phone from "@/components/Phone";
import { Configarator } from "@prisma/client/edge";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import {
  COLORS,
  MATERIALS,
  MODELS,
} from "../../../../../config/option-validator";
import { formatPrice } from "@/lib/utils";
import {
  BASE_PRICE,
  PRODUCT_PRICES,
} from "../../../../../config/product-price-validator";
import { Button } from "@/components/ui/button";

const SummaryDesign = ({ config }: { config: Configarator }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true));
  const { model, color, material, finish } = config;
  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;
  const { tw } = COLORS.find(({ value }) => value === color)!;
  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 1000, spread: 90 }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col md:row-span-3 col-span-1 p-4 sm:col-span-2 justify-center items-center md:col-span-1 space-y-4">
          <Phone imgScr={config.croppedImageUrl!} className={`w-64 bg-${tw}`} />
        </div>
        <div className="flex flex-col items-center col-span-1 sm:col-span-2">
          <p className="text-lg font-semibold">your {modelLabel} case</p>
          <div>
            <Check className="inline text-primary" /> In stock and ready to
            ship.
          </div>
        </div>
        <div className="col-span-1 px-4 pt-4 sm:pb-4 space-y-2">
          <p className="font-semibold">Highlights</p>
          <ol className="list-disc list-inside">
            <li>Wireless charging compatible</li>
            <li>TPU shock absorption</li>
            <li>Packaging made from recycled materials</li>
            <li>5 year print warranty</li>
          </ol>
        </div>
        <div className="col-span-1 px-4 pt-4 pb-4 space-y-2">
          <p className="font-semibold">Materials</p>
          <ol className="list-disc list-inside">
            <li>High-quality, durable material</li>
            <li>Scratch- and fingerprint resistant coating</li>
          </ol>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <div className="text-sm bg-gray-200 flex flex-col py-4 px-4">
            <div className="flex justify-between">
              <p>Base Price</p>
              <p>{formatPrice(BASE_PRICE / 100)}</p>
            </div>
            {material === "polycarbonate" && (
              <div className="flex justify-between">
                <p>Soft polycarbonate material</p>
                <p>
                  {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                </p>
              </div>
            )}
            {finish === "textured" && (
              <div className="flex justify-between">
                <p>Textured finish</p>
                <p>{formatPrice(PRODUCT_PRICES.finish.textured / 100)}</p>
              </div>
            )}
            <div className="h-px w-full bg-gray-400 my-2" />
            <div className="flex text-base justify-between">
              <p>Total Price</p>
              <p>{formatPrice(totalPrice / 100)}</p>
            </div>
          </div>
          <div className="pt-4 flex w-full justify-end">
            <Button>
              Checkout <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SummaryDesign;
