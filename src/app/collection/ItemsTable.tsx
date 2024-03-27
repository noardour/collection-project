"use client";

import Actions from "@/components/Actions";
import { remove } from "@/lib/items/ItemsActions";
import { IItem } from "@/types/IItem";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { FC } from "react";

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
            <Actions editHref="/" onRemove={() => remove(item.id)} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    {}
  </Table>
);

export default ItemsTable;
