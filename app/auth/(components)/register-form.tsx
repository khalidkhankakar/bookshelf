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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Khalid khan"
                  className="shad-input"
                  {...field}
                />
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
                <Input
                  type="email"
                  placeholder="khalidkhan@example.com"
                  className="shad-input"
                  {...field}
                />
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
                <Input
                  type="password"
                  className="shad-input"
                  placeholder="* * * * * * * * *"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(isError || isSuccess) && (
          <StatusMessage isError={isError} isSuccess={isSuccess} />
        )}

        <Button
          type="submit"
          className="w-full bg-dark-200 text-white border-none hover:bg-dark-400 hover:text-white mt-4"
        >
          {isPending ? "SignUp..." : "Sign up"}
        </Button>
      </form>
      <div className="h-[1px] bg-gray-700 mt-4 w-1/2 mx-auto" />
      <SocialLoginButtons type="Sign up" />
    </Form>
  );
};

export default SignUpForm;
