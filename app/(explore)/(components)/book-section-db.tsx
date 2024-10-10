import { Button } from "@/components/ui/button";
import { fetchBooks } from "@/lib/actions/books-api.actions";
import React from "react";
import BookCard from "./book-card";

const BookSectonDB = async ({
  title,
  category,
}: {
  title: string;
  category?: string;
}) => {
  const books = await fetchBooks(category || "all");

  console.log(books);

  return (
    <div>
      <div className=" bg-black text-white p-3">
        <h1 className="text-3xl font-bold mb-4 ">{title}</h1>
        <div className="flex justify-center mt-6 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Render the all books */}
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                bookId={book.id}
                bookTitle={book.title}
                bookAuthors={book.authors}
                bookImage={book.image}
              />
            ))}
          </div>
        </div>
                
      <div className="flex justify-centers">
        <Button variant="link" className="text-white ">View More</Button>
      </div>
      </div>

    </div>
  );
};

export default BookSectonDB;
