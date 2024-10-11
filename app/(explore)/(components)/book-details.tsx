'use client'
import { Star, Download, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ReactionButton from "./reaction-button"


interface BookDetailsProps {
  bookId:string
  title: string
  author: string
  description: string
  bookCategoryArr: {id:string, name:string}[]
  publishedAt: string
  publisher: string
  rating: number
  isFree: boolean
  coverImage: string
  pdfUrl?: string
  saveBookArr:any[]
haveToReadBookArr:any[]
likesBookArr:any[]
}

export default function BookDetails({
  bookId,
    title ,
    author ,
    description ,
    publishedAt,
    publisher,
    rating,
    bookCategoryArr,
    isFree ,
    coverImage,
    pdfUrl,
    saveBookArr,
    haveToReadBookArr,
    likesBookArr
}: BookDetailsProps) {


  const router = useRouter();

  const handleOpenPDF = () => {
    if(!pdfUrl) return; // PDF link you want to open
    const encodeUrl = encodeURIComponent(pdfUrl);
    router.push(`/book/viewer/${encodeUrl}`);
  }
  


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

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
              <p className="text-xl mb-4">by {author}</p>
            </div>
            <div className="flex gap-2 ">
    

            


            <ReactionButton type={'like'} bookId={bookId} toolipTitle="Like" reactionArray={likesBookArr} />
            <ReactionButton type={'haveToRead'} bookId={bookId} toolipTitle="Have to Read" reactionArray={haveToReadBookArr} />
            <ReactionButton type={'save'} bookId={bookId} toolipTitle="Save" reactionArray={saveBookArr} />
                
            </div>
          </div>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(rating)}</div>
            <span className="text-gray-600">({rating.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-x-2">
{
  bookCategoryArr.map((category)=>(
    <Badge key={category.id} variant="secondary" className="mb-4">
    {category.name}
  </Badge>
  ))
}


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
                <Button onClick={handleOpenPDF}  variant="outline" className="border-black text-black hover:bg-gray-100">
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
              </>
            ) : (
              <>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Buy Now
                </Button>
                <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                  Read Sample
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}