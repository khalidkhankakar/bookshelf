import Footer from "@/components/shared/footer";
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
        <Navbar />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
