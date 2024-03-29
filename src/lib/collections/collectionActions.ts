"use server";

import auth from "@/middleware";
import { validateCollectionCreate, validateCollectionEdit } from "@/validators/collectionValidators";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { removeFile, uploadFile } from "../storage/storageActions";
import { randomUUID } from "crypto";
import { ICollection } from "@/types/ICollection";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export type CollectionCreateState =
  | {
      formErrors?: string[];
      fieldErrors?: {
        image?: string[];
        title?: string[];
        category?: string[];
        description?: string[];
      };
    }
  | undefined;

export async function create(prevState: CollectionCreateState, formData: FormData): Promise<CollectionCreateState> {
  const validatedFields = validateCollectionCreate(formData);
  if (!validatedFields.success)
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, formErrors: validatedFields.error.flatten().formErrors };
  const session = await auth();
  if (session?.user.id) {
    const storageFilePath = await uploadFile(validatedFields.data.image, `collections/${randomUUID()}_${validatedFields.data.image.name}`);
    const collection = await prisma.collection.create({ data: { userId: session.user.id, ...validatedFields.data, image: storageFilePath } });
    redirect(`/user/${session.user.id}`);
  } else {
    return { formErrors: ["Something went wrong"] };
  }
}

export async function edit(prevState: CollectionCreateState, formData: FormData): Promise<CollectionCreateState> {
  const oldCollection = await prisma.collection.findUniqueOrThrow({ where: { id: formData.get("collection_id") as string } });
  const validatedFields = validateCollectionEdit(formData);
  if (!validatedFields.success)
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, formErrors: validatedFields.error.flatten().formErrors };
  let newStorageFilePath: string | undefined;
  if (validatedFields.data.image) {
    if (oldCollection.image) await removeFile(oldCollection.image);
    newStorageFilePath = await uploadFile(validatedFields.data.image, `collections/${randomUUID()}_${validatedFields.data.image.name}`);
  }
  await prisma.collection.update({
    where: { id: oldCollection.id },
    data: { ...validatedFields.data, image: newStorageFilePath || oldCollection.image },
  });
  revalidatePath("/user");
  redirect(`/user/${oldCollection.userId}`);
}

export async function remove(id: ICollection["id"]) {
  const session = await auth();
  const collection = await prisma.collection.delete({ where: { id }, include: { items: true } });
  if (collection.image) await removeFile(collection.image);
  revalidatePath("/user");
  redirect(`/user/${session?.user.id}`);
}
