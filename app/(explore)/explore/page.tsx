import { parseSearchParams } from '@/lib/types';
import BookSectonDB from '../(components)/book-section-db'

const page =({searchParams}:{searchParams: Record<string, string | string[] | undefined>;}) => {
  const parsedSearchParams = parseSearchParams(searchParams);
  return (
      <BookSectonDB  title={"Books library"} searchParams={parsedSearchParams} />
  )
}

export default page
