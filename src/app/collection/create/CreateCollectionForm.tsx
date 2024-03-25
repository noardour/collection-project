"use client";

import { create } from "@/lib/collections/collectionActions";
import { CollectionCategory } from "@/types/ICollection";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

const collectionCategories: CollectionCategory[] = ["BOOKS", "CARS", "COINS", "MUSICAL_ALBUMS", "PAINTINGS", "OTHER"];

export default function CreateCollectionForm() {
  const [state, dispatch] = useFormState(create, undefined);

  return (
    <form className="flex flex-col gap-4" action={dispatch}>
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}
      <div className="bg-gray-600 w-[400px] h-[200px]"></div>
      <Input
        label="Title"
        name="title"
        type="text"
        isInvalid={!!state?.fieldErrors?.title}
        errorMessage={state?.fieldErrors?.title?.join(". ").concat(".")}
      />
      <Select
        label="select category"
        name="category"
        isInvalid={!!state?.fieldErrors?.category}
        errorMessage={state?.fieldErrors?.category?.join(". ").concat(".")}
      >
        {collectionCategories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        label="description"
        name="description"
        isInvalid={!!state?.fieldErrors?.description}
        errorMessage={state?.fieldErrors?.description?.join(". ").concat(".")}
      ></Textarea>
      <Button className="self-start" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}
