"use client";

import { IUser } from "@/types/IUser";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

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
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {users.map(({ id, name, email, status, role, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{role}</TableCell>
            <TableCell>{createdAt.toISOString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
