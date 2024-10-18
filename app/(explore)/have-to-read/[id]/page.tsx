import { estimatedTotalBooksOfUserReactions, fetchUserHaveToReadBooks } from "@/lib/actions/user.actions"
import NoResult from "@/components/shared/no-result"
import UserReactionBooksContainer from "../../(components)/user-reaction-books-container"

const page = async({params,searchParams}:{params:{id:string}, searchParams: Record<string, string | string[] | undefined>}) => {
  const haveToReadBooks = await fetchUserHaveToReadBooks(params.id,searchParams)
  const {totalResults, totalPages} = await estimatedTotalBooksOfUserReactions('havetoRead')
  const currentPage = Math.max(1, Number(searchParams?.page) || 1)
  if(!haveToReadBooks || haveToReadBooks.length <= 0) {
    return <NoResult title="No books in your have to read list" message="Be the first to add books to your have to read list 🚀" />
  }

  return (
    <UserReactionBooksContainer title={"Have to Read Books"} books={haveToReadBooks} currentPage={currentPage} totalPages={totalPages} totalResults={totalResults} />
  )
}

export default page
