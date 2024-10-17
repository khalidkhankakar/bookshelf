import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/shared/session-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Bookshelf",
  description: "World most popular book store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <main>{children}
          </main>
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}
