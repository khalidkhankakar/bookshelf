import { fetchUserHaveToReadBooks } from "@/lib/actions/user.actions"
import BookSectonDB from "../../(components)/book-section-db"
import NoResult from "@/components/shared/no-result"

const page = async({params}:{params:{id:string}}) => {
  const haveToReadBooks = await fetchUserHaveToReadBooks(params.id)

  if(!haveToReadBooks || haveToReadBooks.length <= 0) {
    return <NoResult title="No books in your have to read list" message="Be the first to add books to your have to read list 🚀" />
  }

  return (
    <BookSectonDB title={"Your future books"} booksArr={haveToReadBooks} />
  )
}

export default page
