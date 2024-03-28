import { Storage } from "@google-cloud/storage";

console.log(process.env.GCP_PRIVATE_KEY);

export const getGCPCredentials = () => {
  // for Vercel, use environment variables
  return process.env.GCP_PRIVATE_KEY
    ? {
        credentials: {
          client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
        },
        projectId: process.env.GCP_PROJECT_ID,
      }
    : // for local development, use gcloud CLI
      { projectId: process.env.STORAGE_PROJECT_ID, keyFilename: process.env.KEY_FILENAME };
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
