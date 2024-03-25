import { CollectionCategory } from "@/types/ICollection";
import { z } from "zod";

const collectionCategories: CollectionCategory[] = ["BOOKS", "MUSICAL_ALBUMS", "PAINTINGS", "MOVEIS", "COINS", "CARS", "OTHER"];

const createSchema = z.object({
  title: z.string().min(1, "Field is required"),
  category: z.enum([collectionCategories[0], ...collectionCategories]),
  description: z.string().min(1, "Field is required").max(3000),
});

export function validateCollectionCreate(formData: FormData) {
  return createSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  });
}
