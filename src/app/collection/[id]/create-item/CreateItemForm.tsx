"use client";

import ImageInput from "@/components/ImageInput";
import { create } from "@/lib/items/ItemsActions";
import { ICollection } from "@/types/ICollection";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

interface CreateItemFormProps {
  collectionId: ICollection["id"];
}

export default function CreateItemForm({ collectionId }: CreateItemFormProps) {
  const [state, dispatch] = useFormState(create, undefined);

  return (
    <form className="flex flex-col gap-4" action={dispatch}>
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}
      <input type="hidden" name="collection-id" value={collectionId} />

      <ImageInput name="image" />
      {!!state?.fieldErrors?.image && <div className="text-danger">{state?.fieldErrors?.image?.join(". ").concat(".")}</div>}
      <Input
        label="Title"
        name="title"
        type="text"
        isInvalid={!!state?.fieldErrors?.title}
        errorMessage={state?.fieldErrors?.title?.join(". ").concat(".")}
      />
      <Button className="self-start" color="primary" type="submit">
        Create
      </Button>
    </form>
  );
}
