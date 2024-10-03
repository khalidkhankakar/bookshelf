import React from 'react'
import BookDetails from '../../(components)/book-details'

const page = async() => {
    await new Promise(resolve => setTimeout(resolve, 6000));
    
  return (
    <div>
        <BookDetails 
          title ={"The Great Gatsby"}
          author ={"F. Scott Fitzgerald"}
          description ={"The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan."}
          category ={"Classic Literature"}
          publishedAt ={"April 10, 1925"}
          publisher ={"Charles Scribner's Sons"}
          rating ={4.5}
          isFree ={false}
          coverImage ={"https://dummyimage.com/720x400"}
        
        />
      
    </div>
  )
}

export default page
