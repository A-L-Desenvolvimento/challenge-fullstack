import type { Metadata } from "next";
import "./globals.css";
import { getSession } from '@/utils/getSession'

export const metadata: Metadata = {
  title: "Challenge - Frontend",
  description: "Challenge - Frontend",
};

async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  return (
    <html lang="pt-BR">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;