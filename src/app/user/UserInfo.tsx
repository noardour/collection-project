"use client";

import { IUser } from "@/types/IUser";

interface UserInfoProps {
  user: IUser;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="flex flex-col mb-12">
      <h2 className="text-xl font-bold mb-6">User Info</h2>
      <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
        <div className="font-bold">Name:</div>
        <div>{user.name}</div>
      </div>
      <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
        <div className="font-bold">Email:</div>
        <div>{user.email}</div>
      </div>
      <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
        <div className="font-bold">Role:</div>
        <div>{user.role}</div>
      </div>
      <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
        <div className="font-bold">RegisteredAt:</div>
        <div>{user.createdAt.toUTCString()}</div>
      </div>
      <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
        <div className="font-bold">Last login:</div>
        <div>{user.lastLoggedIn.toUTCString()}</div>
      </div>
    </div>
  );
}
