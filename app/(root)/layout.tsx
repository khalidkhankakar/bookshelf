import Navbar from "@/components/shared/navbar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bookshelf",
};
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
