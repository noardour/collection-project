import { fetchUser } from "@/lib/users/userData";
import auth from "@/middleware";
import { IUser } from "@/types/IUser";
import { notFound } from "next/navigation";
import UserControlls from "./UserControlls";
import UserDisplay from "./UserDisplay";

interface UserManuProps {
  id: IUser["id"];
}

export default async function UserManu({ id }: UserManuProps) {
  const user = await fetchUser(id);
  if (!user) notFound();
  const session = await auth();
  return (
    <div>
      {session?.user.role === "ADMIN" && <UserControlls id={user.id} />}
      <UserDisplay user={user} />
    </div>
  );
}
