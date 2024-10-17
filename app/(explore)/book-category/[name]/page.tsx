import { parseSearchParams } from '@/lib/types';
import BookSectonDB from '../../(components)/book-section-db'

const page = ({params,searchParams}:{params:{name:string},searchParams: Record<string, string | string[] | undefined>;}) => {
  const parsedSearchParams = parseSearchParams(searchParams);
  return (
    <BookSectonDB title={params.name} category={params.name} searchParams={parsedSearchParams} />
  )
}

export default page
