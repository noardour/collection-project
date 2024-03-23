import { fetchUsers } from "@/lib/users/userData";
import UsersDisplay from "./UsersDisplay";

export default async function UsersMenu() {
  const users = await fetchUsers();

  return <UsersDisplay users={users} />;
}
