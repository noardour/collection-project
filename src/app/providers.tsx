"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, session }: PropsWithChildren<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
}
