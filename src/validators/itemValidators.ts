import { z } from "zod";

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
  collectionId: z.string().min(1, "Field is required"),
  tags: z.array(z.string()),
});

export function validateItemCreate(formData: FormData) {
  console.log((formData.get("tags") as string).split(" "));
  return createSchema.safeParse({
    image: formData.get("image"),
    title: formData.get("title"),
    collectionId: formData.get("collection-id"),
    tags: (formData.get("tags") as string).split(" "),
  });
}
