import { fetchCollection } from "@/lib/collections/colllectionData";
import Image from "next/image";
import { notFound } from "next/navigation";
import ItemsTable from "../ItemsTable";
import auth from "@/middleware";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import ItemsGrid from "../ItemsGrid";

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
      <div className="relative w-full h-[600px] overflow-hidden">
        <Image src={collection.image as string} alt="collection image" fill className="object-cover" />
      </div>
      <div className="mb-8">{collection.description}</div>
      {/* <ItemsTable items={collection.items} /> */}
      {collection.userId === session?.user.id ? (
        <div className="mb-4">
          <Link href={`/collection/${collection.id}/create-item`}>
            <Button color="primary">Add Item</Button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <ItemsGrid items={collection.items} />
    </div>
  );
}
