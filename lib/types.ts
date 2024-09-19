import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(2,{message:'username must be at least 2 characters'}).max(50,{message:'username must be less than 50 characters'}),
    email: z.string().email({message:'email must be a valid email'}),
    password:z.string().min(2,{message:'password must be at least  characters'}),
  });

  export const signInSchema = z.object({
    email: z.string().email({message:'email must be a valid email'}),
    password:z.string().min(2,{message:'password must be at least 8 characters'}),
  });