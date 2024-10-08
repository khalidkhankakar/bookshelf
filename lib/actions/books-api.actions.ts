import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { BookTable } from "../db/schema";
import { redirect } from "next/navigation";

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
        const book = await db.query.BookTable.findFirst({ where:eq(BookTable.id, id)});
        return book;
    } catch (error) {
        console.log(error);   
    }
}


export const fetchBooks = async (category:string)=>{
    if(category=='all'){
        const books = await db.select().from(BookTable);
        console.log(books);
        return books;
    }
  
    const books = await db.select().from(BookTable).where(eq(BookTable.category,category));
    console.log(books);
    return books;
}

