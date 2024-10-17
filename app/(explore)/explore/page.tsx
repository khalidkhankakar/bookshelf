import { parseSearchParams } from '@/lib/types';
import BookSectonDB from '../(components)/book-section-db'

const page =({searchParams}:{searchParams: Record<string, string | string[] | undefined>;}) => {
  const parsedSearchParams = parseSearchParams(searchParams);
  return (
    <div className='w-full'>
      <BookSectonDB  title={"All Books"} searchParams={parsedSearchParams} />
    </div>
  )
}

export default page
