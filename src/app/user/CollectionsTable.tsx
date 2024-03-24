import { ICollection } from "@/types/ICollection";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

interface ActionsProps {
  lookHref: string;
  onRemove?: () => void;
}

const Actions: FC<ActionsProps> = ({ lookHref, onRemove }) => (
  <div className="relative flex items-center gap-2">
    <Link href={lookHref}>
      <span className="text-lg text-primary cursor-pointer active:opacity-50">
        <FontAwesomeIcon icon={faEye} />
      </span>
    </Link>
    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onRemove}>
      <FontAwesomeIcon icon={faTrashCan} />
    </span>
  </div>
);

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
                  <Actions lookHref="/" onRemove={() => console.log(`remove ${collection.id}`)} />
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
};

export default CollectionsTable;
