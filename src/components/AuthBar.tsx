import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

const AuthBar: FC = () => {
  return (
    <>
      <Link href="/login">
        <Button variant="light">Log in</Button>
      </Link>
      <Button variant="light">Register</Button>
    </>
  );
};

export default AuthBar;
