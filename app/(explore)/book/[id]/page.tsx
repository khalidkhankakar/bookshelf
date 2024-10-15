import React from 'react'
import BookDetails from '../../(components)/book-details'
import { fetchBookById } from '@/lib/actions/books-api.actions'
import { auth } from '@/auth'
import { fetchUserProfileById } from '@/lib/actions/user.actions'

const page = async({params}:{params:{id:string}}) => {
   const {book, bookCategoryArr, bookAuthorArr} = await fetchBookById(params.id)
   if(!book) {
    return <div className='text-white font-semibold text-center my-12 text-3xl'>OOps! 🚫 Book not found</div>
   }
   const session = await auth()
   let saveBookArr:any[] = []
   let haveToReadBookArr:any[] = []
   let likesBookArr:any[] = []

   if(session?.user){
     const user = await fetchUserProfileById(session?.user?.id as string)
     console.log({user})
     saveBookArr = user?.savedBooks || [];
     haveToReadBookArr = user?.haveToReadBooks || [];
     likesBookArr = user?.likedBooks || [];
    }

  return (
    <div>
        <BookDetails 
          bookId={params.id}
          title ={book.title}
          description ={book.description}
          bookCategoryArr={bookCategoryArr}
          publishedAt ={book.publishedAt?.toString().split('T')[0] }
          publisher ={book.publisher}
          rating ={4.5}
          isFree ={(book.isFree || book.isFree !== null) ? true : false}
          coverImage ={book.image}
          pdfUrl={book.bookPdf}
          saveBookArr={saveBookArr}
          haveToReadBookArr={haveToReadBookArr}
          bookAuthorArr={bookAuthorArr}
          likesBookArr={likesBookArr}
        />
      
    </div>
  )
}

export default page
