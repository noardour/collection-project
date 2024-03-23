import { IUser } from "@/types/IUser";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: Pick<IUser, "role" | "status"> & DefaultSession["user"];
  }
}
