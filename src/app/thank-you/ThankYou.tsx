"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "./action";
import Loader from "@/components/Loader";
import Image from "next/image";
import { COLORS } from "../../../config/option-validator";
import Phone from "@/components/Phone";
import { formatPrice } from "@/lib/utils";
import { Check } from "lucide-react";

const ThankYou = () => {
  const search = useSearchParams();
  const orderId = search.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus(orderId),
    retry: true,
    retryDelay: 500,
  });

  if (!data) {
    return (
      <Loader title="Loading your order..." massage="This won't take long." />
    );
  }

  if (!data.isPaid) {
    return (
      <Loader
        title="Verifying your payment..."
        massage="This might take a moment."
      />
    );
  }

  const { billing_address, shipping_address, configurator, createdAt, price } =
    data;
  const { color, croppedImageUrl } = configurator;

  const tw = COLORS.find((cl) => cl.value === color)?.tw;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 py-6">
      <h3 className="text-xl flex col-span-1 justify-center md:order-1 items-center">
        Thank you for ordering
      </h3>
      <div className="flex justify-center items-center col-span-1 md:row-span-3 md:order-0">
        <Phone imgScr={croppedImageUrl!} width={64} className={`bg-${tw}`} />
      </div>
      <div className="col-span-1 bg-zinc-200 p-4 rounded-lg md:order-2">
        <h4 className="text-lg font-semibold tracking-tight">
          Shipping Adress
        </h4>
        <div className="h-px bg-zinc-400 my-2" />
        <p className="flex justify-between">
          <span>Email</span>
          <span>{shipping_address?.name}</span>
        </p>
        <p className="flex justify-between">
          <span>Street</span>
          <span>{shipping_address?.street}</span>
        </p>
        <p className="flex justify-between">
          <span>City</span>
          <span>{shipping_address?.city}</span>
        </p>
        <p className="flex justify-between">
          <span>State</span>
          <span>{shipping_address?.state}</span>
        </p>
        <p className="flex justify-between">
          <span>Country</span>
          <span>{shipping_address?.country}</span>
        </p>
        <p className="flex justify-between">
          <span>PIN code</span>
          <span>{shipping_address?.postalCode}</span>
        </p>
        <p className="flex justify-between">
          <span>Phone number</span>
          <span>
            {shipping_address?.phoneNumber
              ? shipping_address?.phoneNumber
              : "NA"}
          </span>
        </p>
      </div>
      <div className="px-4 md:order-3">
        <p className="flex justify-between">
          <span>Order date</span>
          <span>{createdAt.toDateString()}</span>
        </p>
        <p className="flex justify-between">
          <span>{formatPrice(price / 100)}</span>
          <span>
            <Check className="inline text-primary" /> Paid
          </span>
        </p>
      </div>
    </div>
  );
};
export default ThankYou;
