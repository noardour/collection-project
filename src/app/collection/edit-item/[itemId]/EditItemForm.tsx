"use client";

import ImageInput from "@/components/ImageInput";
import { edit } from "@/lib/items/ItemsActions";
import { IItem } from "@/types/IItem";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

interface CreateItemFormProps {
  item: IItem;
}

export default function EditItemForm({ item }: CreateItemFormProps) {
  const [state, dispatch] = useFormState(edit, undefined);

  return (
    <form className="flex flex-col gap-4" action={dispatch}>
      {state?.formErrors?.length ? <div className="text-danger mb-4 font-bold">{state?.formErrors.join(". ") + "."}</div> : undefined}

      <ImageInput name="image" />
      {!!state?.fieldErrors?.image && <div className="text-danger">{state?.fieldErrors?.image?.join(". ").concat(".")}</div>}
      <input type="hidden" name="item_id" value={item.id} />
      <Input
        label="Title"
        name="title"
        type="text"
        isInvalid={!!state?.fieldErrors?.title}
        errorMessage={state?.fieldErrors?.title?.join(". ").concat(".")}
        defaultValue={item.title}
      />
      <Button className="self-start" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
}
