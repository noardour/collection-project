import { ICollection } from "@/types/ICollection";
import { FC } from "react";
import CollectionsTable from "./CollectionsTable";

interface CollectionsListProps {
  collections?: ICollection[];
}

const CollectionsList: FC<CollectionsListProps> = ({ collections }) => (
  <div>
    <h2 className="text-xl font-bold mb-6">Collections</h2>
    <CollectionsTable collections={collections} />
  </div>
);

export default CollectionsList;
