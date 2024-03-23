"use client";

import { removeUser, setStatus } from "@/lib/users/userActions";
import { auth } from "@/auth/auth";
import { IUser } from "@/types/IUser";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface UserControllsProps {
  id: IUser["id"];
}

export default function UserControlls({ id }: UserControllsProps) {
  return (
    <div className="flex flex-row gap-4 items-start mb-4">
      <Button color="primary" onClick={() => setStatus(id, "BLOCKED")} size="sm">
        Block
      </Button>
      <Button color="primary" onClick={() => setStatus(id, "ACTIVE")} size="sm">
        Unblock
      </Button>
      <Button color="danger" onClick={() => removeUser(id)} size="sm">
        delete
      </Button>
    </div>
  );
}
