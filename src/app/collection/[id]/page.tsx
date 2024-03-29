import { fetchCollection } from "@/lib/collections/colllectionData";
import Image from "next/image";
import { notFound } from "next/navigation";
import auth from "@/middleware";
import { Button, Link as UILink } from "@nextui-org/react";
import Link from "next/link";
import ItemsGrid from "../ItemsGrid";
import Actions from "@/components/Actions";

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
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">{collection.title}</h1>
        {session?.user.id === collection.userId || session?.user.role === "ADMIN" ? (
          <div className="ml-auto">
            <Actions editHref={`/collection/${collection.id}/edit`} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-2 text-default-400 mb-2 text-sm">
        <div>category:</div>
        <div>{collection.category}</div>
      </div>
      <div className="flex gap-2 mb-2 text-sm">
        <div>author:</div>
        <Link href={`/user/${collection.userId}`}>
          <UILink>{collection.User.name}</UILink>
        </Link>
      </div>
      {collection.image && (
        <div className="relative w-full h-[600px] overflow-hidden mb-8">
          <Image src={collection.image as string} alt="collection image" fill className="object-cover" />
        </div>
      )}
      <div className="mb-8">{collection.description}</div>
      {/* <ItemsTable items={collection.items} /> */}
      {collection.userId === session?.user.id || session?.user.role === "ADMIN" ? (
        <div className="mb-4">
          <Link href={`/collection/${collection.id}/create-item`}>
            <Button color="primary">Add Item</Button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <ItemsGrid items={collection.items} withActions={session?.user.id === collection.id || session?.user.role === "ADMIN"} />
    </div>
  );
}
