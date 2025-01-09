import type { Metadata } from "next";
import "./../globals.css";
import { getSession } from '@/utils/getSession'
import MyNavbar from "@/components/MyNavbar";
import {MyFooter} from "@/components/MyFooter";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Challenge - Frontend",
  description: "Challenge - Frontend",
};

async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getSession()
  return (
    <html lang="pt-BR">
    <body
        className="antialiased"
    >
      <MyNavbar key={session ? 'logged' : 'not-logged'} user={session?.user} />

      <main className="container mx-auto max-w-7xl px-4 py-8">
          {children}
      </main>

      <MyFooter />


    </body>
    </html>
  );
}

export default RootLayout;