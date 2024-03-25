import { CollectionCategory } from "@/types/ICollection";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import CreateCollectionForm from "./CreateCollectionForm";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">New Collection</h1>
      <CreateCollectionForm />
    </div>
  );
}
