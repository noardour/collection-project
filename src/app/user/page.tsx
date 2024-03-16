"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Page of the user USERNAME</h1>

      <Tabs>
        <Tab key="info" title="User Information">
          <div className="flex flex-col mb-12">
            <h2 className="text-xl font-bold">User Info</h2>
            <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
              <div className="font-bold">Name:</div>
              <div>testUserName</div>
            </div>
            <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
              <div className="font-bold">Email:</div>
              <div>test@test.com</div>
            </div>
            <div className="flex flex-row [&:not(:last-child)]:border-b-1 gap-5 py-3">
              <div className="font-bold">Last login:</div>
              <div>1992.02.01</div>
            </div>
          </div>
        </Tab>
        <Tab key="collections" title="Users collections">
          <div>
            <h2 className="text-xl font-bold">Collections</h2>
          </div>
        </Tab>
        <Tab key="actions" title="User Actions">
          <div className="flex flex-row gap-4 items-start">
            <Button color="warning">Block</Button>
            <Button color="warning">Unblock</Button>
            <Button color="danger">delete</Button>
            <Link href="/admin-panel">
              <Button color="primary">Admin panel</Button>
            </Link>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
