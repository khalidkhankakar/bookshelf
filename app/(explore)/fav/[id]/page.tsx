import {  fetchUserLikedBooks } from "@/lib/actions/user.actions"
import BookSectonDB from "../../(components)/book-section-db"
import NoResult from "@/components/shared/no-result"

const page = async({params}:{params:{id:string}}) => {
  const userLikedBooks = await fetchUserLikedBooks(params.id)

  if(!userLikedBooks || userLikedBooks.length <= 0) {
    return <NoResult title="No liked books " message="Be the first to like books to your have to favorite list ❤"/>
  }

  return (
    <BookSectonDB title={"Your favorite Books"} booksArr={userLikedBooks} />
  )
}

export default page
