import React from "react";
import StarRating from "./star-rating";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({bookId, bookTitle, bookAuthors, bookImage}:{bookId: string, bookTitle: string, bookAuthors: string, bookImage: string}) => {
  return (
    <Link href={`/book/${bookId}`} >


    <div className="bg-gray-800 p-4 rounded-lg flex flex-col">
      <Image
        src={bookImage}
        alt={bookTitle}
        width={200}
        height={300}
        className="w-full h-40 object-cover mb-2 rounded"
      />
      <p className="text-sm font-semibold text-white mb-1 truncate">
        {bookTitle}
      </p>
      <p className="text-xs text-gray-500 mb-2">{bookAuthors} </p>
      <StarRating rating={3.5} />
    </div>
    </Link>
  );
};

export default BookCard;
