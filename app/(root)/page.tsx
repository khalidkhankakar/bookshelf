import Link from "next/link";
import Features from "./(components)/features";
import FeaturedSection from "./(components)/featured-section";
import Footer from "@/components/shared/footer";

export default async function Home() {

 
  return (
    <div className="pt-20 pb-3 text-center">

      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Get any book with BookShelf
      </h1>
      <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
      Explore, read, and save your favorite books effortlessly with our seamless bookshelf platform!
      </p>
      <div className="flex gap-x-2 items-center justify-center">
        <Link
          href="/explore"
          className="bg-[#1e966e] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#195a43] transition duration-300"
        >
          Explore
        </Link>
        <Link
          href="/contribute"
          className="bg-[#b204f7] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#531c69] transition duration-300"
        >
          Contribute
        </Link>
      </div>
      <FeaturedSection />
      <Features />
      <Footer />
    </div>
  );
}
