import React from 'react'
import BookDetails from '../../(components)/book-details'
import { fetchBookById } from '@/lib/actions/books-api.actions'

const page = async({params}:{params:{id:string}}) => {
   const book = await fetchBookById(params.id)
   if(!book) {
    return <div className='text-white'>Book not found</div>
   }
  return (
    <div>
        <BookDetails 
          title ={book[0].title}
          author ={book[0].author}
          description ={book[0].description}
          category ={book[0].category}
          publishedAt ={book[0].publishedAt?.toString().split('T')[0] }
          publisher ={book[0].publisher}
          rating ={4.5}
          isFree ={(book[0].isFree || book[0].isFree !== null) ? true : false}
          coverImage ={book[0].image}
        />
      
    </div>
  )
}

export default page
