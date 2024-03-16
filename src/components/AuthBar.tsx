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

export default AuthBar;
