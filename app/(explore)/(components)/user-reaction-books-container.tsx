import { Suspense } from "react"
import BookCard from "./book-card"
import { BookPagination } from "./pagination/pagination"

const UserReactionBooksContainer = ({books, title, currentPage, totalPages, totalResults}:{books:any[], title:string, currentPage:number, totalPages:number, totalResults:number}) => {
  return (
    <div>
      <div className=" bg-black text-white p-3">
        <h1 className="text-3xl font-bold mb-4  text-[#00E599]">{title}</h1>
        <div className="container px-5  mx-auto">
          <div className="flex flex-wrap  justify-center -m-4">
            {/* Render the all books */}
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                bookId={book.id}
                bookTitle={book.title}
                bookAuthors={book.author[0].author.name}
                bookImage={book.image}
                bookDesc={book.description}
                bookRating={book.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <BookPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </Suspense>
    </div>
  )
}

export default UserReactionBooksContainer
