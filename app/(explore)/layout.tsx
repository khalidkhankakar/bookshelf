import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { Metadata } from "next";
import React from "react";
import SearchFilterContainer from "./(components)/search-filter-container";

export const metadata: Metadata = {
  title: "Explore | Bookshelf",
};

const ExploreLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="bg-black flex flex-col gap-y-6 text-white">
      <Navbar />
      <SearchFilterContainer />
      <section className="mx-auto w-[90vw]">{children}</section>
      <Footer />
    </main>
  );
};

export default ExploreLayout;
