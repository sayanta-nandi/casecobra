"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Radio, RadioGroup } from "@headlessui/react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Check, ChevronsDownUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Rnd } from "react-rnd";
import { COLORS, MODELS } from "../../../../../config/option-validator";

const DesignConfigurator = ({
  configId,
  imageUrl,
  dimensions: { width, height },
}: {
  configId: string;
  imageUrl: string;
  dimensions: { width: number; height: number };
}) => {
  const [option, setOption] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
  });
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 my-20">
      <div className="relative flex items-center justify-center h-[37.5rem] col-span-2 w-full max-w-4xl border-2 border-gray-400 border-dashed rounded-lg p-12 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden">
        <div className="relative pointer-events-none w-60 aspect-[896/1831]">
          <AspectRatio
            className="relative aspect-[896/1831] pointer-events-none w-full z-40"
            ratio={896 / 1831}
          >
            <Image
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
          className="absolute z-20"
          lockAspectRatio
        >
          <Image alt="" src={imageUrl} fill />
        </Rnd>
      </div>
      <div className="col-span-full lg:col-span-1 h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white"
          />
          <div className="px-8">
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
                <Label className="tracking-tight text-lg">
                  Color: {option.color.label}
                </Label>
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
                <Label className="tracking-tight text-lg font-normal">
                  Model
                </Label>
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
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default DesignConfigurator;
