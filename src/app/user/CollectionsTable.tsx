"use client";

import Actions from "@/components/Actions";
import { remove } from "@/lib/collections/collectionActions";
import { ICollection } from "@/types/ICollection";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface CollectionsTableProps {
  collections?: ICollection[];
}

const CollectionsTable: FC<CollectionsTableProps> = ({ collections }) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Title</TableColumn>
        <TableColumn>Category</TableColumn>
        <TableColumn>Items Count</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {collections
          ? collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.title}</TableCell>
                <TableCell>{collection.category}</TableCell>
                <TableCell>{collection.items.length}</TableCell>
                <TableCell>
                  <Actions
                    lookHref={`/collection/${collection.id}`}
                    editHref={`/collection/${collection.id}/edit`}
                    onRemove={() => remove(collection.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
};

export default CollectionsTable;
