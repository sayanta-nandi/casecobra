"use server";

import { prisma } from "@/utils/client";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client/edge";

export type saveConfigProps = {
  color: CaseColor;
  material: CaseMaterial;
  model: PhoneModel;
  finish: CaseFinish;
  configId: string;
};

export async function saveConfig({
  color,
  material,
  model,
  finish,
  configId,
}: saveConfigProps) {
  await prisma.configarator.update({
    where: {
      id: configId,
    },
    data: {
      color,
      material,
      finish,
      model,
    },
  });
}
