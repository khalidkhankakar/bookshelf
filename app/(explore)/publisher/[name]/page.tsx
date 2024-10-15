import { fetchBookByPublisher } from '@/lib/actions/books-api.actions'
import React from 'react'
import BookSectonDB from '../../(components)/book-section-db'

const page =async ({params}:{params:{name:string}}) => {
  const publisherWithSpace = params.name.replaceAll('%20', ' ')
  const books = await fetchBookByPublisher(publisherWithSpace)
  return (
    <BookSectonDB title={publisherWithSpace} category={publisherWithSpace} booksArr={books} />
  )
}

export default page
