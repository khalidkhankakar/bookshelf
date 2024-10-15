import { fetchUserSavedBooks } from "@/lib/actions/user.actions"
import BookSectonDB from "../../(components)/book-section-db"
import NoResult from "@/components/shared/no-result"

const page = async({params}:{params:{id:string}}) => {
  const savedBooks = await fetchUserSavedBooks(params.id)
  if(!savedBooks || savedBooks.length <= 0) {
    return <NoResult title="No books in your saved list" message="Be the first to add books to your saved list 🚀" />
  }
  return (
    <BookSectonDB title={"Saved Books"} booksArr={savedBooks} />
  )
}

export default page
