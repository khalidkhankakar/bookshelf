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
import { signUpSchema } from "@/lib/types";
import { createUser } from "@/lib/actions/user.actions";
import { useState, useTransition } from "react";
import StatusMessage from "./status-message";

type SignUpFormSchema = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const [isError, setIsError] = useState<string | undefined>("");
  const [isSuccess, setIsSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    const { username, email, password } = values;

    startTransition(() => {
      createUser({ username, email, password })
        .then((res) => {
          if (res?.success) {
            setIsSuccess(res?.message);
          } else {
            setIsError(res?.message);
          }
          setTimeout(() => {
            setIsSuccess("");
            setIsError("");
          }, 3000);
        })
        .catch((res) => {
          setIsError(res?.message);
          setTimeout(() => {
            setIsSuccess("");
            setIsError("");
          }, 3000);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Khalid khan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="n0IYv@example.com" {...field} />
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
                <Input type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

{(isError || isSuccess) && (
        <StatusMessage isError={isError} isSuccess={isSuccess} />
      )}


        <Button type="submit" className="w-full">
          {isPending ? "SignUp..." : "Sign up"}
        </Button>
      </form>
      <Separator className="my-2" />
      <SocialLoginButtons type="Sign up" />

    </Form>
  );
};

export default SignUpForm;
