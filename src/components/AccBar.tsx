import { auth, signOut } from "@/auth/auth";
import { IUser } from "@/types/IUser";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

const AuthBar: FC = () => {
  return (
    <>
      <Link href="/login">
        <Button variant="light">Log in</Button>
      </Link>
      <Link href="/registration">
        <Button variant="light">Register</Button>
      </Link>
    </>
  );
};

interface UserBarProps {
  id?: IUser["id"];
  name?: IUser["name"];
  role?: IUser["role"];
}

const UserBar: FC<UserBarProps> = ({ id, name, role }) => {
  return (
    <>
      <div>
        Добро пожаловать <Link href={`/user/${id}`}>{name}</Link>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant="light" type="submit">
          Log Out
        </Button>
      </form>
      {role === "ADMIN" && (
        <Link href="/admin-panel">
          <Button variant="light">Admin panel</Button>
        </Link>
      )}
    </>
  );
};

const AccBar: FC = async () => {
  const session = await auth();
  return session?.user ? <UserBar id={session.user.id} name={session.user.name || undefined} role={session.user.role} /> : <AuthBar />;
};

export default AccBar;
