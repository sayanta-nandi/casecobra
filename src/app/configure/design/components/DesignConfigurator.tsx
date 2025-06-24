"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, RadioGroup } from "@headlessui/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ArrowRight, Check, ChevronsDownUp } from "lucide-react";
import NextImage from "next/image";
import { useRef, useState, useTransition } from "react";
import { Rnd } from "react-rnd";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "../../../../../config/option-validator";
import Label from "./ui/Label";
import { NEXT_META_SUFFIX } from "next/dist/lib/constants";
import { formatPrice } from "@/lib/utils";
import { BASE_PRICE } from "../../../../../config/product-price-validator";
import { useUploadThing } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig, saveConfigProps } from "../action/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const DesignConfigurator = ({
  configId,
  imageUrl,
  dimensions: { width, height },
}: {
  configId: string;
  imageUrl: string;
  dimensions: { width: number; height: number };
}) => {
  const router = useRouter();
  const [isPen, startTransition] = useTransition();
  const { mutate: saveConfig, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (props: saveConfigProps) => {
      await Promise.all([saveConfiguration(), _saveConfig(props)]);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSuccess: () => {
      startTransition(() => router.push(`/configure/preview?id=${configId}`));
    },
  });

  const [option, setOption] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  const [renderedDimensions, setRenderedDimensions] = useState({
    width: width / 4,
    height: height / 4,
  });
  const [renderedPositions, setRenderedPositions] = useState({
    x: 150,
    y: 205,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);

  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfiguration() {
    try {
      const {
        height,
        width,
        left: caseLeft,
        top: caseTop,
      } = caseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();
      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPositions.x - leftOffset;
      const actualY = renderedPositions.y - topOffset;

      // console.log(`X : ${actualX}, Y : ${actualY}`);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimensions.width,
        renderedDimensions.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error) {}
  }

  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
  if (isPen)
    return (
      <Loader
        title="Createing your case..."
        massage="Redirecting you to preview page..."
      />
    );
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 my-20">
      <div
        ref={containerRef}
        className="relative flex items-center justify-center h-[37.5rem] col-span-2 w-full max-w-4xl border-2 border-gray-400 border-dashed rounded-lg p-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden"
      >
        <div className="relative pointer-events-none w-60 aspect-[896/1831]">
          <AspectRatio
            ref={caseRef}
            className="relative aspect-[896/1831] pointer-events-none w-full z-40"
            ratio={896 / 1831}
          >
            <NextImage
              alt=""
              src="/phone-template.png"
              fill
              className="z-40 pointer-events-none select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] rounded-[32px]" />
          <div
            className={`absolute inset-0 bg-${option.color.tw} rounded-[32px]`}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: height / 4,
            width: width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedPositions({ x, y });
            setRenderedDimensions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });
          }}
          onDragStop={(_, data) => {
            setRenderedPositions({ x: data.x, y: data.y });
          }}
          className="absolute z-20"
          lockAspectRatio
        >
          <div className="relative h-full w-full">
            <NextImage alt="" src={imageUrl} fill />
          </div>
        </Rnd>
      </div>
      <div className="col-span-full lg:col-span-1 h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white"
          />
          <div className="px-8 pb-32 pt-8">
            <h2 className="tracking-tight text-3xl font-semibold">
              Customize Case
            </h2>
            <div className="h-px my-4 w-full bg-gray-300" />
            <div className="flex flex-col justify-between h-full space-y-6">
              <RadioGroup
                value={option.color}
                onChange={(value) =>
                  setOption((prev) => ({ ...prev, color: value }))
                }
              >
                <Label>Color: {option.color.label}</Label>
                <div className="flex items-center space-x-3 mt-3">
                  {COLORS.map((color) => (
                    <Radio
                      key={color.label}
                      value={color}
                      className={`cursor-pointer border-2 rounded-full p-0.5 ${
                        color.label === option.color.label
                          ? `border-${color.tw}`
                          : "border-transparent"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 bg-${color.tw} rounded-full border border-black border-opacity-10`}
                      />
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              <div className="flex flex-col space-y-4">
                <Label>Model</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full flex justify-between"
                    >
                      {option.model.label}
                      <ChevronsDownUp />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {MODELS.options.map((model) => (
                      <DropdownMenuItem
                        key={model.label}
                        onClick={() =>
                          setOption((prev) => ({ ...prev, model }))
                        }
                      >
                        <Check
                          className={`${
                            model.value === option.model.value
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                        />
                        {model.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {[MATERIALS, FINISHES].map(
                ({ name, options: selectableOptions }) => (
                  <RadioGroup
                    key={name}
                    value={option[name]}
                    onChange={(val) =>
                      setOption((prev) => ({ ...prev, [name]: val }))
                    }
                    className="flex flex-col space-y-4"
                  >
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    {selectableOptions.map((selectableOption) => (
                      <Radio
                        key={selectableOption.label}
                        value={selectableOption}
                        className={`border border-gray-200 rounded-lg select-none cursor-pointer hover:bg-gray-100 ${
                          selectableOption.label === option[name].label
                            ? "border-primary"
                            : ""
                        }`}
                      >
                        <div className="w-full flex items-center justify-between px-6 py-2">
                          <div className="flex flex-col">
                            <p className="tracking-tight">
                              {selectableOption.label}
                            </p>
                            <p className="tracking-tight font-light">
                              {selectableOption.description}
                            </p>
                          </div>
                          <div>{formatPrice(selectableOption.price / 100)}</div>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                )
              )}
            </div>
          </div>
        </ScrollArea>
        <div className="w-full flex flex-col gap-2 px-8">
          <div className="w-full bg-zinc-200 h-px" />
          <div className="flex justify-between items-center h-16">
            <p className="font-semibold text-lg">
              {formatPrice(
                (BASE_PRICE + option.finish.price + option.material.price) / 100
              )}
            </p>
            <Button
              disabled={isPending}
              isLoading={isPending}
              onClick={() =>
                saveConfig({
                  color: option.color.value,
                  finish: option.finish.value,
                  material: option.material.value,
                  model: option.model.value,
                  configId,
                })
              }
            >
              Continue <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesignConfigurator;
