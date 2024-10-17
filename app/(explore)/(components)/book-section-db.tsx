import { estimatedTotalBooks, fetchBooks } from "@/lib/actions/books-api.actions";
import BookCard from "./book-card";
import { SearchParams } from "@/lib/types";
import { Suspense } from "react";
import { BookPagination } from "./pagination/pagination";

const BookSectonDB = async ({
  title,
  category,
  booksArr,
  searchParams
}: {
  title: string;
  category?: string;
  booksArr?: any[];
  searchParams: SearchParams

}) => {
  // TODO Book Array fix it and also use the promise.all()
  const books = booksArr || (await fetchBooks(category || "all",searchParams))
  const currentPage = Math.max(1, Number(searchParams?.page) || 1);
  const {totalResults, totalPages} = await estimatedTotalBooks(category || "all",searchParams)
  
  return (
    <div>
      <div className=" bg-black text-white p-3">
        <h1 className="text-3xl font-bold mb-4 ">{title}</h1>
        <div className="flex justify-center mt-6 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Render the all books */}
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                bookId={book.id}
                bookTitle={book.title}
                bookAuthors={book.author[0].author.name}
                bookImage={book.image}
                bookRating={book.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={null} >
      <BookPagination
       currentPage={currentPage} 
       totalPages={totalPages} 
       totalResults={totalResults} 
  />
      </Suspense>
    </div>
  );
};

export default BookSectonDB;
