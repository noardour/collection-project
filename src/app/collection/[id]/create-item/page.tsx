import CreateItemForm from "./CreateItemForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">New Item</h1>
      <CreateItemForm collectionId={params.id} />
    </div>
  );
}
