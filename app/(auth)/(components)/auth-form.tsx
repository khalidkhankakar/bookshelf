"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SocialLoginButtons from "./social-login-buttons";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { signInSchema, signUpSchema } from "@/lib/types";

// Combine both schemas as a union
type AuthFormSchema = z.infer<typeof signInSchema> | z.infer<typeof signUpSchema>;

const AuthForm = ({ type }: { type: "signIn" | "signUp" }) => {
  // Use the correct schema and default values based on the form type.
  const formSchema = type === "signIn" ? signInSchema : signUpSchema;
  const formDefaultValues: AuthFormSchema = type === "signIn"
    ? {
        email: "",
        password: "",
      }
    : {
        username: "",
        email: "",
        password: "",
      };

  // Initialize the form with conditional types
  const form = useForm<AuthFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  // Define the submit handler.
  const onSubmit = (values: AuthFormSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Conditionally render the username field */}
        {type === "signUp" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {type === "signIn" ? "Sign in" : "Sign up"}
        </Button>
      </form>
      <Separator className="my-2" />
      <SocialLoginButtons type={type === "signIn" ? "Sign in" : "Sign up"} />
      <Separator className="my-2" />
      <Button variant={"link"} className="w-full my-2">
        <Link href={type === "signIn" ? "/sign-up" : "/sign-in"}>
          {type === "signIn"
            ? "Create an Account"
            : "Log in with an existing account"}
        </Link>
      </Button>
    </Form>
  );
};

export default AuthForm;
