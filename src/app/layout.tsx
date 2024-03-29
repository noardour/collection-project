import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import clsx from "clsx";
import auth from "@/middleware";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Collection Project",
    template: "%s | Collection Project",
  },
  description: "collection project for itransition",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={clsx(inter.className, "light")}>
        <Providers session={session}>
          <div className="text-foreground bg-background min-h-screen">
            <Header />
            <div className="relative container max-w-7xl mx-auto px-6 pt-10 pb-40">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
