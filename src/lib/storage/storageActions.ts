import { Storage } from "@google-cloud/storage";

export const getGCPCredentials = () => {
  // for Vercel, use environment variables
  return process.env.GOOGLE_PRIVATE_KEY
    ? {
        credentials: {
          client_email: process.env.GCLOUD_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
        projectId: process.env.GCP_PROJECT_ID,
      }
    : // for local development, use gcloud CLI
      {};
};

const storage = new Storage(getGCPCredentials());

export async function uploadFile(file: File, fileOutputName: string) {
  try {
    const storageFile = storage.bucket(process.env.BUCKET_NAME as string).file(fileOutputName);
    await storageFile.save(Buffer.from(await file.arrayBuffer()));
    return storageFile.publicUrl();
  } catch (err) {
    console.log(`File upload error: ${err}`);
  }
}

export async function removeFile(fileStoragePath: string) {
  const urlMatch = fileStoragePath.match(/^https:\/\/storage\.googleapis\.com\/([^\/]+)\/(.+)$/);
  const filePath = decodeURIComponent((urlMatch && urlMatch[2]) as string);
  await storage
    .bucket(process.env.BUCKET_NAME as string)
    .file(filePath as string)
    .delete();
}
