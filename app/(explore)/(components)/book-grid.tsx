import Image from "next/image";
import StarRating from "./star-rating";


function BookGrid({ books }: { books: string}) {
  const parsedBooks = JSON.parse(books);
  console.log(parsedBooks)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {parsedBooks.map((book:any) => (
          <div key={book.id} className="bg-gray-800 p-4 rounded-lg flex flex-col">
            <Image
              src={book.volumeInfo.imageLinks?.small||book.volumeInfo.imageLinks?.medium||book.volumeInfo.imageLinks?.thumbnail }
              alt={book.volumeInfo.title}
              width={200}
              height={300}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <p className="text-sm font-semibold text-white mb-1 truncate">{book.volumeInfo.title}</p>
            <p className="text-xs text-gray-500 mb-2">{Array.isArray(book.volumeInfo?.authors)? book.volumeInfo?.authors[0]:book.volumeInfo?.authors}</p>
            <StarRating rating={book.volumeInfo.averageRating} />
          </div>
        ))}
      </div>
    )
}
export default BookGrid;