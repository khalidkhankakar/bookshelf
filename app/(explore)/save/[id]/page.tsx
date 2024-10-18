import { estimatedTotalBooksOfUserReactions, fetchUserSavedBooks } from "@/lib/actions/user.actions"
import NoResult from "@/components/shared/no-result"
import UserReactionBooksContainer from "../../(components)/user-reaction-books-container"

const page = async({params, searchParams}:{params:{id:string}, searchParams: Record<string, string | string[] | undefined>}) => {
  const savedBooks = await fetchUserSavedBooks(params.id, searchParams)
  const {totalResults, totalPages} = await estimatedTotalBooksOfUserReactions('save')
  const currentPage = Math.max(1, Number(searchParams?.page) || 1)
  if(!savedBooks || savedBooks.length <= 0) {
    return <NoResult title="No books in your saved list" message="Be the first to add books to your saved list 🚀" />
  }
  return (
    <UserReactionBooksContainer title={"Saved Books"} books={savedBooks} currentPage={currentPage} totalPages={totalPages} totalResults={totalResults} />
  )
}

export default page
