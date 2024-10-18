import {  estimatedTotalBooksOfUserReactions, fetchUserLikedBooks } from "@/lib/actions/user.actions"
import NoResult from "@/components/shared/no-result"
import UserReactionBooksContainer from "../../(components)/user-reaction-books-container";

const page = async({params , searchParams}:{params:{id:string} , searchParams: Record<string, string | string[] | undefined>;}) => {
  const userLikedBooks = await fetchUserLikedBooks(params.id,searchParams)
  const {totalResults, totalPages} = await estimatedTotalBooksOfUserReactions('like')
  const currentPage = Math.max(1, Number(searchParams?.page) || 1)
  if(!userLikedBooks || userLikedBooks.length <= 0) {
    return <NoResult title="No liked books " message="Be the first to like books to your have to favorite list ❤"/>
  }

  return (
    <UserReactionBooksContainer title={"Your Favorite Books"} books={userLikedBooks} currentPage={currentPage} totalPages={totalPages} totalResults={totalResults} />
  )
}

export default page
