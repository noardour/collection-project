import { notFound } from "next/navigation";
import EditItemForm from "./EditItemForm";
import { fetchItem } from "@/lib/items/itemsData";

interface PageProps {
  params: {
    itemId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const item = await fetchItem(params.itemId);
  if (!item) notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Item</h1>
      <EditItemForm item={item} />
    </div>
  );
}
