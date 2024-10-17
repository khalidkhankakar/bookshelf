"use client";
import {  Download, Eye, ShoppingCart, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactionButton from "./reaction-button";
import StarRating from "./star-rating";

interface BookDetailsProps {
  bookId: string;
  title: string;
  description: string;
  bookCategoryArr: { id: string; name: string }[];
  bookAuthorArr: { id: string; name: string }[];
  publishedAt: string;
  publisher: string;
  rating: number;
  isFree: boolean;
  coverImage: string;
  pdfUrl?: string;
  saveBookArr: any[];
  haveToReadBookArr: any[];
  likesBookArr: any[];
}

export default function BookDetails({
  bookId,
  title,
  description,
  publishedAt,
  publisher,
  rating,
  bookCategoryArr,
  isFree,
  coverImage,
  pdfUrl,
  saveBookArr,
  bookAuthorArr,
  haveToReadBookArr,
  likesBookArr,
}: BookDetailsProps) {
  const router = useRouter();

  const handleOpenPDF = () => {
    if (!pdfUrl) return; // PDF link you want to open
    const encodeUrl = encodeURIComponent(pdfUrl);
    router.push(`/book/viewer/${encodeUrl}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <Image
            src={coverImage}
            alt={`Cover of ${title}`}
            className="w-full h-auto rounded-lg shadow-lg"
            width={300}
            height={300}
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <div className="flex items-center gap-x-2 ">
                <p className="text-gray-500 font-semibold text-xl ">By: </p>
                {bookAuthorArr.map((author) => (
                  <Badge
                    key={author.id}
                    variant="secondary"
                    className="flex items-center justify-between gap-x-1"
                  >
                    <User size={12} /> {author.name}
                  </Badge>
                ))}
              </div>
            </div>


              <div className="flex gap-2 ">
                <ReactionButton
                  type={"like"}
                  bookId={bookId}
                  toolipTitle="Like"
                  reactionArray={likesBookArr}
                />
                <ReactionButton
                  type={"haveToRead"}
                  bookId={bookId}
                  toolipTitle="Have to Read"
                  reactionArray={haveToReadBookArr}
                />
                <ReactionButton
                  type={"save"}
                  bookId={bookId}
                  toolipTitle="Save"
                  reactionArray={saveBookArr}
                />
              </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              <StarRating rating={rating} />
            </div>
            <span className="text-gray-600">({rating.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-x-2">
            {bookCategoryArr.map((category) => (
              <Badge
                key={category.id}
                className="flex items-center justify-between gap-x-1 mb-4"
              >
                <Tag size={12} /> {category.name}
              </Badge>
            ))}
          </div>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="font-semibold">Published</h2>
              <p>{publishedAt}</p>
            </div>
            <div>
              <h2 className="font-semibold">Publisher</h2>
              <p>{publisher}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {isFree ? (
              <>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button
                  onClick={handleOpenPDF}
                  variant="outline"
                  className="border-black text-black hover:bg-gray-100"
                >
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-gray-100"
                >
                  Read Sample
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
