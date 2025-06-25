"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATUSES } from "../../../config/option-validator";
import { Check, ChevronDownIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateStatus } from "./action";
import { useRouter } from "next/navigation";

const StatusDropdown = ({
  orderId,
  currStatus,
}: {
  orderId: string;
  currStatus: string;
}) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["update-status"],
    mutationFn: updateStatus,
    onSuccess: () => {
      router.refresh();
    },
  });

  const status = STATUSES.find((st) => st.value === currStatus)?.label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          {status} <ChevronDownIcon className="inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {STATUSES.map((st) => (
          <DropdownMenuItem
            className={`${st.value === currStatus ? "bg-zinc-100" : ""} `}
            key={st.value}
            onClick={() => mutate({ orderId, updatedStatus: st.value })}
          >
            <Check
              className={`${
                st.value === currStatus ? "opacity-100" : "opacity-0"
              } text-primary`}
            />{" "}
            {st.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default StatusDropdown;
