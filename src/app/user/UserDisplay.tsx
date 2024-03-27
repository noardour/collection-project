"use client";

import { IUser } from "@/types/IUser";
import { Tab, Tabs } from "@nextui-org/react";
import UserInfo from "./UserInfo";
import CollectionsList from "./CollectionsList";

interface UserDisplayProps {
  user: IUser;
}

export default function UserDisplay({ user }: UserDisplayProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">
        Page of the user <b>{user.name}</b>
      </h1>

      {user.status === "BLOCKED" && <div className="mb-4 text-danger">This user is blocked!</div>}

      <Tabs>
        <Tab key="collections" title="Users collections">
          <CollectionsList collections={user.collections} />
        </Tab>
        <Tab key="info" title="User Information">
          <UserInfo user={user} />
        </Tab>
      </Tabs>
    </div>
  );
}
