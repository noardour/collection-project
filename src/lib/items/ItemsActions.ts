"use server";

import { validateItemCreate } from "@/validators/itemValidators";
import { PrismaClient } from "@prisma/client";
import { removeFile, uploadFile } from "../storage/storageActions";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { IItem } from "@/types/IItem";
import { revalidatePath } from "next/cache";
import { Router } from "next/router";
const prisma = new PrismaClient();

export type ItemCreateState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        image?: string[];
        title?: string[];
      };
    }
  | undefined;

export async function create(prevState: ItemCreateState, formData: FormData): Promise<ItemCreateState> {
  const validatedFields = validateItemCreate(formData);
  if (!validatedFields.success)
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, formErrors: validatedFields.error.flatten().formErrors };
  const storageFilePath = await uploadFile(validatedFields.data.image, `items/${randomUUID()}_${validatedFields.data.image.name}`);
  await prisma.item.create({ data: { ...validatedFields.data, image: storageFilePath as string } });
  revalidatePath(`/collection/`);
  redirect(`/collection/${validatedFields.data.collectionId}`);
}

export async function remove(id: IItem["id"]) {
  const item = await prisma.item.delete({ where: { id } });
  await removeFile(item.image);
  revalidatePath("/collection");
}
