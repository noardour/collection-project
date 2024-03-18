import { fetchUsers } from "@/actions/userActions";
import UsersTable from "./UsersTable";

export default async function UsersDisplay() {
  const users = await fetchUsers();

  return <UsersTable users={users} />;
}
