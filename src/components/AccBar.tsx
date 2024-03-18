import { auth, signOut } from "@/auth/auth";
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

const UserBar: FC = () => {
  return (
    <>
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
    </>
  );
};

const AccBar: FC = async () => {
  const session = await auth();
  return session?.user ? <UserBar /> : <AuthBar />;
};

export default AccBar;
