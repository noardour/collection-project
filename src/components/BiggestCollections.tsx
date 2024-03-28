import { fetchBiggestCollections } from "@/lib/collections/colllectionData";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default async function BiggestCollections() {
  const collections = await fetchBiggestCollections();

  return (
    <div className="flex flex-col gap-14">
      <h1 className="text-3xl font-bold">Biggest collections</h1>
      <div className="flex flex-col gap-8">
        {collections.map((collection) => (
          <div className="flex gap-4" key={collection.id}>
            {collection.image && <Image src={collection.image} alt="collection image" width={100} height={50} />}
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-xl font-bold">{collection.title}</div>
              <div className="flex gap-2 text-default-400 text-sm">
                <div>category:</div>
                <div>{collection.category}</div>
                <Link href={`collection/${collection.id}`}>
                  <Button color="primary" size="sm">
                    Read more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
