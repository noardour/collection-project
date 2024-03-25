"use server";

import auth from "@/middleware";
import { validateCollectionCreate } from "@/validators/collectionValidators";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export type CollectionCreateState =
  | {
      formErrors?: string[];
      fieldErrors?: {
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
    const collection = await prisma.collection.create({ data: { userId: session.user.id, ...validatedFields.data } });
    console.log(collection);
    redirect(`/user/${session.user.id}`);
  } else {
    return { formErrors: ["Something went wrong"] };
  }
}
