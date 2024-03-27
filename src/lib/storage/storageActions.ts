import { Storage } from "@google-cloud/storage";

const storage = new Storage({ projectId: process.env.STORAGE_PROJECT_ID, keyFilename: process.env.KEY_FILENAME });

export async function uploadFile(file: File, fileOutputName: string) {
  try {
    const storageFile = storage.bucket(process.env.BUCKET_NAME as string).file(fileOutputName);
    await storageFile.save(Buffer.from(await file.arrayBuffer()));
    return storageFile.publicUrl();
  } catch (err) {
    console.log(`File upload error: ${err}`);
  }
}
