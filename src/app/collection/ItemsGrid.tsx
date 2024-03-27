"use client";

import Actions from "@/components/Actions";
import { remove } from "@/lib/items/ItemsActions";
import { IItem } from "@/types/IItem";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";

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
            <Actions editHref="/" onRemove={() => remove(item.id)} />
          </div>
        </CardBody>
      </Card>
    ))}
  </div>
);

export default ItemsGrid;
