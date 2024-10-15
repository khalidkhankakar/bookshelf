import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { bookCategoryTable, BookTable } from "../db/schema";

// Function to fetch books by category from Google Books API
export const fetchBooksByCategory = async function fetchBooksByCategory(category:string) {
    const apiKey =process.env.GOOGLE_BOOKS_API_KEY; // Replace with your Google Books API key
    // const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=10&key=${apiKey}`;
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const url = `${baseUrl}?q=${category}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error(`Error fetching books for category "${category}":`, error);
    }
}

export const fetchBookById = async (id:string)=>{
    try {
        const book = await db.query.BookTable.findFirst({
            
            where:eq(BookTable.id, id),
            with:{
                category: {
                    with: {
                        category:true
                    }
                },         
                author:{
                    with:{
                        author:true
                    }
                }
                
            }

        });

        const bookCategoryArr = book?.category?.map((category:any)=>category.category);
        const bookAuthorArr = book?.author?.map((author:any)=>author.author);
        console.log({bookAuthorArr})
        return {book,bookCategoryArr,bookAuthorArr};
    } catch (error) {
        console.log(error);   
    }
}


export const fetchBooks = async (category:string)=>{
    if(category=='all'){
        const books = await db.query.BookTable.findMany({
            with:{
                author:{
                    with:{
                        author:true
                    }
                }
            }
        });

        return books;
    }
    const books = await db.query.bookCategoryTable.findMany({
        where:eq(bookCategoryTable.name, category),
        with: {
            books: {
                with: {
                    book: {
                        with:{
                            author:{
                                with:{
                                    author:true
                                }
                            }
                        }
                    }
                }
            }

        }
    })
    const booArr = books.map((singleBook:any)=>singleBook.books[0].book);
    return booArr;
}



export const fetchBookByPublisher = async(publisher:string)=>{
//     const books = await db.select().from(BookTable).where(eq(BookTable.publisher, publisher),
//     with:{
//         author:{
//             with:{
//                 author:true
//             }
//         }
//     }

// );
const books = await db.query.BookTable.findMany({
    where:eq(BookTable.publisher, publisher),
    with:{
        author:{
            with:{
                author:true
            }
        }
    }
})
    return books
}