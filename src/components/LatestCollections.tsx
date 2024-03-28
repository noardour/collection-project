import { fetchLatestCollections } from "@/lib/collections/colllectionData";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function LatestCollections() {
  const collections = await fetchLatestCollections();

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-3xl font-bold">Latest Collections</h1>
      <div className="flex flex-col gap-8">
        {collections.map((collection) => (
          <div key={collection.id}>
            <div className="text-2xl font-bold">{collection.title}</div>
            <div className="flex gap-1">
              {collection.image && <Image src={collection.image} alt="collection image" width={400} height={200} />}
              <div className="flex-1 flex flex-col items-start gap-2">
                <div className="flex gap-2 text-default-400 text-sm">
                  <div>category:</div>
                  <div>{collection.category}</div>
                </div>
                <div>{collection.description}</div>
                <div className="self-end">
                  <Link href={`collection/${collection.id}`}>
                    <Button color="primary" size="sm">
                      Read more
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
