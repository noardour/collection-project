import { fetchCollection } from "@/lib/collections/colllectionData";
import EditCollectionForm from "./EditCollectionForm";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const collection = await fetchCollection(params.id);
  if (!collection) notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">New Collection</h1>
      <EditCollectionForm collection={collection} />
    </div>
  );
}
