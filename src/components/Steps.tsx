"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const STEPS = [
  {
    name: "Step 1: Add image",
    description: "Choose an image for your case",
    url: "/upload",
  },
  {
    name: "Step 2: Customize design",
    description: "Make the case yours",
    url: "/design",
  },
  {
    name: "Step 3: Summary",
    description: "review your final desing",
    url: "/preview",
  },
];

const Steps = () => {
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  return (
    <ol className="flex flex-col sm:flex-row justify-center">
      {STEPS.map((step, i) => {
        const isCurrent = pathname.endsWith(step.url);
        const isCompleted = STEPS.slice(i + 1).some((step) => {
          return pathname.endsWith(step.url);
        });
        return (
          <li
            key={step.name}
            className={cn(
              "border p-4 border-t-0 sm:border sm:border-l-0 border-gray-200",
              i === 0 ? "border-t sm:border-l" : "",
              {
                "border-l-4 sm:border-b-4 border-l-gray-600 sm:border-l-gray-200 sm:border-b-gray-600":
                  isCurrent,
                "border-l-4 border-l-primary sm:border-b-4 sm:border-b-green-500":
                  isCompleted,
              }
            )}
          >
            <div>
              <span
                className={cn(
                  "",
                  {},
                  {
                    "bg-zinc-700": isCurrent,
                    "bg-primary": isCompleted,
                  }
                )}
                aria-hidden="true"
              >
                <span className="flex flex-col">
                  <span
                    className={cn("font-semibold", {
                      "text-primary": isCompleted,
                      "text-zinc-700": isCurrent,
                    })}
                  >
                    {step.name}
                  </span>
                  <span className="text-sm text-zinc-600">
                    {step.description}
                  </span>
                </span>
              </span>
              {/* seperator */}
              {i !== 0 ? <div className=""></div> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
