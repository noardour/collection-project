"use client";

import ImageInput from "@/components/ImageInput";
import { edit } from "@/lib/collections/collectionActions";
import { CollectionCategory, ICollection } from "@/types/ICollection";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

const collectionCategories: CollectionCategory[] = ["BOOKS", "CARS", "COINS", "MUSICAL_ALBUMS", "PAINTINGS", "OTHER"];

interface EditCollectionFormProps {
  collection: ICollection;
}

export default function EditCollectionForm({ collection }: EditCollectionFormProps) {
  const [state, dispatch] = useFormState(edit, undefined);

  return (
    <form className="flex flex-col gap-4" action={dispatch}>
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}
      <ImageInput name="image" />
      {!!state?.fieldErrors?.image && <div className="text-danger">{state?.fieldErrors?.image?.join(". ").concat(".")}</div>}
      <input type="hidden" value={collection.id} name="collection_id" />
      <Input
        label="Title"
        name="title"
        type="text"
        isInvalid={!!state?.fieldErrors?.title}
        errorMessage={state?.fieldErrors?.title?.join(". ").concat(".")}
        defaultValue={collection.title}
      />
      <Select
        label="select category"
        name="category"
        isInvalid={!!state?.fieldErrors?.category}
        errorMessage={state?.fieldErrors?.category?.join(". ").concat(".")}
        defaultSelectedKeys={collection.category}
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
        defaultValue={collection.description}
      ></Textarea>
      <Button className="self-start" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
}
