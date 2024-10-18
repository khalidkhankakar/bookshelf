import React from "react";
import StarRating from "./star-rating";
import Image from "next/image";
import Link from "next/link";

const BookCard = ({
  bookId,
  bookTitle,
  bookAuthors,
  bookDesc,
  bookImage,
  bookRating,
}: {
  bookId: string;
  bookDesc: string;
  bookTitle: string;
  bookAuthors: string;
  bookImage: string;
  bookRating: number;
}) => {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden">
        <Image
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={bookImage}
          width={721}
          height={401}
          alt="blog"
          priority
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {bookAuthors}
          </h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">
            {bookTitle?.substring(0, 20)} ...
          </h1>
          <p className="leading-relaxed text-gray-500  text-sm mb-3">
            {bookDesc?.substring(0, 100)} ...
          </p>
          <div className="flex items-center flex-wrap justify-between ">
            <Link
              href={`/book/${bookId}`}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Book Details
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <StarRating rating={bookRating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
