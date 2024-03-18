import { Button, Card, CardBody } from "@nextui-org/react";
import UsersDisplay from "./UsersDisplay";

export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <Card>
          <CardBody>
            <div className="flex gap-4">
              <Button color="primary" size="sm">
                Action
              </Button>
              <Button color="primary" size="sm">
                Other
              </Button>
              <Button color="primary" size="sm">
                Reload
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        <UsersDisplay />
      </div>
    </div>
  );
}
