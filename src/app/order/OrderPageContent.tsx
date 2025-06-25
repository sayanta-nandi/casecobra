"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "./action";
import Phone from "@/components/Phone";
import { formatPrice } from "@/lib/utils";
import {
  FINISHES,
  MATERIALS,
  MODELS,
  STATUSES,
} from "../../../config/option-validator";
import Loader from "@/components/Loader";

const OrderPageContent = () => {
  const { data } = useQuery({
    queryKey: ["get-orders"],
    queryFn: getOrders,
  });

  if (!data) {
    return <Loader title="Loading your orders" massage="Wait for a sec..." />;
  }

  if (data.length === 0) {
    return <div>No orders</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-2">
      {data.map((order) => {
        const model = MODELS.options.find(
          (option) => option.value === order.configurator.model
        )?.label;
        const material = MATERIALS.options.find(
          (option) => option.value === order.configurator.material
        )?.label;
        const finish = FINISHES.options.find(
          (option) => option.value === order.configurator.finish
        )?.label;
        const status = STATUSES.find(
          (option) => option.value === order.status
        )?.label;
        return (
          <div
            key={order.id}
            className={`p-4 rounded-lg border col-span-1 grid grid-cols-3 ${
              order.status === "awaiting_shipment"
                ? "bg-zinc-100 border-zinc-300"
                : order.status === "shipped"
                ? "bg-yellow-100 border-yellow-300"
                : "bg-green-100 border-green-300"
            }`}
          >
            <div className="flex items-center justify-center col-span-1 row-span-2">
              <Phone imgScr={order.configurator.croppedImageUrl!} width={32} />
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-lg">{model}</p>
              <p className="flex gap-4 text-sm">
                <span>{material}</span>
                <span>{finish}</span>
              </p>
            </div>
            <div className="flex items-center">
              {formatPrice(order.price / 100)}
            </div>
            <div className="flex items-center">{status}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderPageContent;
