import { fetchCollection } from "@/lib/collections/colllectionData";
import Image from "next/image";
import { notFound } from "next/navigation";
import ItemsTable from "../ItemsTable";
import auth from "@/middleware";
import { Button } from "@nextui-org/react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const collection = await fetchCollection(params.id);
  const session = await auth();
  if (!collection) notFound();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{collection.title}</h1>
      <div className="flex gap-2 text-default-400 mb-2 text-sm">
        <div>category:</div>
        <div>{collection.category}</div>
      </div>
      <div className="mb-4">
        <div className="hidden md:block w-full h-[420px] bg-gray-700" />
      </div>
      <div className="mb-8">{collection.description}</div>
      <ItemsTable items={collection.items} />
      {collection.userId === session?.user.id ? (
        <div className="pt-4">
          <Button color="primary">Add Item</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
