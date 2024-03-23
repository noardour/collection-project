"use client";

import { IUser } from "@/types/IUser";
import UsersTable from "./UsersTable";
import UsersToolbar from "./UsersToolbar";
import { useState } from "react";
import { Selection } from "@nextui-org/react";
import { removeUsers, setRoleMany, setStatusMany } from "@/lib/users/userActions";

interface UsersDisplayProps {
  users: IUser[];
}

export default function UsersDisplay({ users }: UsersDisplayProps) {
  const [selectedUsers, setSelectedUsers] = useState<Selection>(new Set<string>());

  return (
    <div>
      <div className="mb-4">
        <UsersToolbar
          onBlock={() => setStatusMany([...selectedUsers] as string[], "BLOCKED")}
          onUnblock={() => setStatusMany([...selectedUsers] as string[], "ACTIVE")}
          onPromoteToAdmin={() => setRoleMany([...selectedUsers] as string[], "ADMIN")}
          onDowngrateToUser={() => setRoleMany([...selectedUsers] as string[], "USER")}
          onRemove={() => removeUsers([...selectedUsers] as string[])}
        />
      </div>
      <div>
        <UsersTable users={users} selectedKeys={selectedUsers} onSelectionChange={setSelectedUsers} />
      </div>
    </div>
  );
}
