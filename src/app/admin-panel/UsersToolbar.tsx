"use client";

import { FC } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

interface UsersToolbarProps {
  onPromoteToAdmin?: () => void;
  onDowngrateToUser?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onRemove?: () => void;
  onRefresh?: () => void;
}

const UsersToolbar: FC<UsersToolbarProps> = ({ onBlock, onDowngrateToUser, onPromoteToAdmin, onRemove, onUnblock, onRefresh }) => (
  <Card>
    <CardBody>
      <div className="flex gap-4">
        <Button color="primary" onClick={onPromoteToAdmin}>
          Promote to Amdin
        </Button>
        <Button color="primary" onClick={onDowngrateToUser}>
          Downgrade to User
        </Button>
        <Button color="primary" onClick={onBlock}>
          Block <FontAwesomeIcon icon={faLock} />
        </Button>
        <Button color="primary" onClick={onUnblock}>
          <FontAwesomeIcon icon={faLockOpen} />
        </Button>
        <Button color="danger" onClick={onRemove}>
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
        <Button className="ml-auto" color="primary" variant="light" onClick={onRefresh}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Button>
      </div>
    </CardBody>
  </Card>
);

export default UsersToolbar;
