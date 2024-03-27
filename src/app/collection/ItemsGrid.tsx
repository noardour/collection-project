"use client";

import { remove } from "@/lib/items/ItemsActions";
import { IItem } from "@/types/IItem";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
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

interface ItemsGridProps {
  items: IItem[];
}

const ItemsGrid: FC<ItemsGridProps> = ({ items }) => (
  <div className="flex gap-4">
    {items.map((item) => (
      <Card key={item.id}>
        <CardHeader>
          <Image width={200} height={150} src={item.image} alt="items image" />
        </CardHeader>
        <CardBody className="p-2 flex flex-col">
          <div className="font-bold">{item.title}</div>
          <div className="self-end mt-auto">
            <Actions onRemove={() => remove(item.id)} />
          </div>
        </CardBody>
      </Card>
    ))}
  </div>
);

export default ItemsGrid;
