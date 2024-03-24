"use client";

import { IItem } from "@/types/IItem";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FC } from "react";

interface ActionsProps {
  onEdit?: () => void;
  onRemove?: () => void;
}

const Actions: FC<ActionsProps> = ({ onRemove, onEdit }) => (
  <div className="relative flex items-center gap-2">
    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={onEdit}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </span>
    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onRemove}>
      <FontAwesomeIcon icon={faTrashCan} />
    </span>
  </div>
);

interface ItemsTableProps {
  items: IItem[];
}

const ItemsTable: FC<ItemsTableProps> = ({ items }) => (
  <Table>
    <TableHeader>
      <TableColumn>Title</TableColumn>
      <TableColumn>Actions</TableColumn>
    </TableHeader>
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.title}</TableCell>
          <TableCell width={200}>
            <Actions onEdit={() => console.log(`edit ${item.id}`)} onRemove={() => console.log(`remove ${item.id}`)} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    {}
  </Table>
);

export default ItemsTable;
