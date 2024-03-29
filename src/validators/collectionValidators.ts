import { CollectionCategory } from "@/types/ICollection";
import { z } from "zod";

const collectionCategories: CollectionCategory[] = ["BOOKS", "MUSICAL_ALBUMS", "PAINTINGS", "MOVEIS", "COINS", "CARS", "OTHER"];
const MAX_UPLOAD_SIZE = 1024 * 1024 * 20;
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp", "image/tiff", "image/avif"];

const createSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 20MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be an image"),
  title: z.string().min(1, "Field is required"),
  category: z.enum([collectionCategories[0], ...collectionCategories]),
  description: z.string().min(1, "Field is required").max(3000),
});

export function validateCollectionCreate(formData: FormData) {
  return createSchema.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  });
}

const editSchema = z.object({
  image: z
    .instanceof(File)
    .transform((file) => (file.size === 0 ? undefined : file))
    .refine((file) => {
      if (!file) return true;
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 20MB")
    .refine((file) => {
      if (!file) return true;
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be an image"),
  title: z.string().min(1, "Field is required"),
  category: z.enum([collectionCategories[0], ...collectionCategories]),
  description: z.string().min(1, "Field is required").max(3000),
});

export function validateCollectionEdit(formData: FormData) {
  return editSchema.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
  });
}
