import Image from "next/image";
import { auth } from "@/auth/auth";

export default async function Home() {
  const au = await auth();
  return (
    <main>
      <div>{au?.user?.email || "123"}</div>
    </main>
  );
}
