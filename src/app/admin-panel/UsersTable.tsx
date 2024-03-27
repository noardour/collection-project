"use client";

import { IUser } from "@/types/IUser";
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableProps, TableRow } from "@nextui-org/react";
import { FC } from "react";
import { removeUser, setRole, setStatus } from "@/lib/users/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Actions from "@/components/Actions";

const statusColorMap: Record<IUser["status"], ChipProps["color"]> = {
  ACTIVE: "success",
  BLOCKED: "warning",
};

const Status: FC<{ status: IUser["status"] }> = ({ status }) => (
  <Chip color={statusColorMap[status]} size="sm" variant="flat">
    {status}
  </Chip>
);

const Role: FC<{ role: IUser["role"]; onClick?: () => void }> = ({ role, onClick }) => (
  <Chip className="cursor-pointer" size="sm" variant="flat" onClick={onClick}>
    {role}
  </Chip>
);

interface UsersTableProps extends TableProps {
  users: IUser[];
}

export default function UsersTable({ users, ...props }: UsersTableProps) {
  return (
    <Table selectionMode="multiple" onRowAction={(key) => null} aria-label="table for managing users" {...props}>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Registered At</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {users.map(({ id, name, email, status, role, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>
              <Role role={role} onClick={() => setRole(id, role === "USER" ? "ADMIN" : "USER")} />
            </TableCell>
            <TableCell>
              <Status status={status} />
            </TableCell>
            <TableCell>{createdAt.toISOString()}</TableCell>
            <TableCell>
              <Actions
                lookHref={`/user/${id}`}
                onBlock={() => setStatus(id, "BLOCKED")}
                onUnblock={() => setStatus(id, "ACTIVE")}
                onRemove={() => removeUser(id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
