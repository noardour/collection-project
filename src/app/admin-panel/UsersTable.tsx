"use client";

import { IUser } from "@/types/IUser";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { FC, MouseEventHandler } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import { removeUser } from "@/actions/userActions";

interface ActionsProps {
  onClick?: MouseEventHandler;
}

const Actions: FC<ActionsProps> = ({ onClick }) => (
  <div className="relative flex items-center gap-2">
    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onClick}>
      <DeleteIcon />
    </span>
  </div>
);

interface UsersTableProps {
  users: IUser[];
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Registered At</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {users.map(({ id, name, email, status, role, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>{createdAt.toISOString()}</TableCell>
            <TableCell>
              <Actions
                onClick={(e) => {
                  removeUser(id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
