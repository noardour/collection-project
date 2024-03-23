import { signOut } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await signOut();
  return NextResponse.redirect(new URL("/", req.nextUrl.origin));
}
