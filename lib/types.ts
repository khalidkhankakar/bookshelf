import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(2,{message:'username must be at least 2 characters'}).max(50,{message:'username must be less than 50 characters'}),
    email: z.string().email({message:'email must be a valid email'}),
    password:z.string().min(2,{message:'password must be at least  characters'}),
  });

  export  interface dummyBook {
    id: number
    title: string
    author: string
    category: string
    image: string
    rating: number
  }

  export const signInSchema = z.object({
    email: z.string().email({message:'email must be a valid email'}),
    password:z.string().min(2,{message:'password must be at least 8 characters'}),
  });

  export const BookFormValidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    author: z.string().min(1, "Author is required"),
    bookCoverImg: z
      .any()
      .refine((files) => files && files.length > 0, "Image is required"),
    bookPDF: z
      .any()
      .refine((files) => files && files.length > 0, "PDF is required"),
    isFree: z.boolean(),
    price: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value) && value >= 0, {
      message: "Price must be a valid number and greater than or equal to 0",
    })
    .optional(),
    category: z.string().min(1, "Category is required"),
    publisher: z.string().min(1, "Publisher is required"),
    publishedAt: z.string().min(1, "Published date is required"),
  });
  



