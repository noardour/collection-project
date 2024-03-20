"use client";

import { IUser } from "@/types/IUser";
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableProps, TableRow } from "@nextui-org/react";
import { FC } from "react";
import { removeUser, setStatus } from "@/lib/users/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const statusColorMap: Record<"ACTIVE" | "BLOCKED", ChipProps["color"]> = {
  ACTIVE: "success",
  BLOCKED: "warning",
};

interface ActionsProps {
  onLook?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onRemove?: () => void;
}

const Actions: FC<ActionsProps> = ({ onLook, onBlock, onUnblock, onRemove }) => (
  <div className="relative flex items-center gap-2">
    <span className="text-lg text-primary cursor-pointer active:opacity-50" onClick={onLook}>
      <FontAwesomeIcon icon={faEye} />
    </span>
    <span className="text-lg text-warning cursor-pointer active:opacity-50" onClick={onBlock}>
      <FontAwesomeIcon icon={faLock} />
    </span>
    <span className="text-lg text-warning cursor-pointer active:opacity-50" onClick={onUnblock}>
      <FontAwesomeIcon icon={faLockOpen} />
    </span>
    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onRemove}>
      <FontAwesomeIcon icon={faTrashCan} />
    </span>
  </div>
);

const Status: FC<{ status: "ACTIVE" | "BLOCKED" }> = ({ status }) => (
  <Chip color={statusColorMap[status]} size="sm" variant="flat">
    {status}
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
            <TableCell>{role}</TableCell>
            <TableCell>
              <Status status={status} />
            </TableCell>
            <TableCell>{createdAt.toISOString()}</TableCell>
            <TableCell>
              <Actions
                onLook={() => console.log(`look ${name}`)}
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
