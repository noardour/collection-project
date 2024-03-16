"use client";

import { Button, Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

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
        <Table>
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Role</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>
            <TableRow key="0">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>testtest@test.com</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
            <TableRow key="1">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>testtest@test.com</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>testtest@test.com</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>William Howard</TableCell>
              <TableCell>testtest@test.com</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
