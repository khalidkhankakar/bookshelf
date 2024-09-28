import React from "react";
import BookGrid from "./book-grid";
import { Button } from "@/components/ui/button";
import { fetchBooksByCategory } from "@/lib/actions/books-api.actions";

const BookSection = async  ({title}:{title:string}) => {
  const books = await fetchBooksByCategory(title)
  return (
    <div className=" bg-black text-white p-3">
      <h1 className="text-3xl font-bold mb-4 ">
       {title}
      </h1>
      <BookGrid books={JSON.stringify(books)} />
      <div className="flex justify-center mt-6 mb-5">
        <Button variant="link" className="text-white ">View More</Button>
      </div>
    </div>
  );
};

export default BookSection;
