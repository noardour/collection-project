"use client";

import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faLock, faLockOpen, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";

interface ActionsProps {
  lookHref?: string;
  editHref?: string;
  onBlock?: () => void;
  onUnblock?: () => void;
  onRemove?: () => void;
}

const Actions: FC<ActionsProps> = ({ lookHref, editHref, onBlock, onUnblock, onRemove }) => (
  <div className="relative flex items-center gap-2">
    {lookHref && (
      <Link href={lookHref}>
        <span className="text-lg text-primary cursor-pointer active:opacity-50">
          <FontAwesomeIcon icon={faEye} />
        </span>
      </Link>
    )}
    {editHref && (
      <Link href={editHref}>
        <span className="text-lg text-primary cursor-pointer active:opacity-50">
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </Link>
    )}
    {onBlock && (
      <span className="text-lg text-warning cursor-pointer active:opacity-50" onClick={onBlock}>
        <FontAwesomeIcon icon={faLock} />
      </span>
    )}
    {onUnblock && (
      <span className="text-lg text-warning cursor-pointer active:opacity-50" onClick={onUnblock}>
        <FontAwesomeIcon icon={faLockOpen} />
      </span>
    )}
    {onRemove && (
      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onRemove}>
        <FontAwesomeIcon icon={faTrashCan} />
      </span>
    )}
  </div>
);

export default Actions;
