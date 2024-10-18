import { fetchBookByPublisher } from '@/lib/actions/books-api.actions'
import BookSectonDB from '../../(components)/book-section-db'

const page = async ({params, searchParams}:{params:{name:string}, searchParams: Record<string, string | string[] | undefined>;}) => {
  const publisherWithoutSpace = params.name.replaceAll('%20', ' ')
  const books = await fetchBookByPublisher(publisherWithoutSpace, searchParams)
  return (
    <BookSectonDB title={publisherWithoutSpace} category={publisherWithoutSpace} booksArr={books} searchParams={searchParams} />
  )
}

export default page
