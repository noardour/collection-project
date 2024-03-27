import { ICollection } from "@/types/ICollection";
import { FC } from "react";
import CollectionsTable from "./CollectionsTable";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface CollectionsListProps {
  collections?: ICollection[];
}

const CollectionsList: FC<CollectionsListProps> = ({ collections }) => (
  <div>
    <div className="flex flex-row gap-4">
      <h2 className="text-xl font-bold mb-6">Collections</h2>
      <Link href="/collection/create">
        <Button color="primary" size="sm">
          + new collection
        </Button>
      </Link>
    </div>
    <CollectionsTable collections={collections} />
  </div>
);

export default CollectionsList;
