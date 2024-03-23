import { Suspense } from "react";
import UserMenu from "../UserMenu";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>...loading User</div>}>
      <UserMenu id={params.id} />
    </Suspense>
  );
}
