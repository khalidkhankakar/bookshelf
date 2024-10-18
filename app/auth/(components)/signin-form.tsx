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
import { signInSchema } from "@/lib/types";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import StatusMessage from "./status-message";

type SignInFormSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isError, setIsError] = useState<string | undefined>("");
  const [isSuccess, setIsSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormSchema) => {
    const { email, password } = values;

    startTransition(() => {
      signIn("credentials", { email, password })
        .then((res) => {
          if (res?.error) {
            setIsError(
              "Incorrect email or password or account is not verified"
            );
          } else {
            setIsSuccess("Login successfully");
          }

          setTimeout(() => {
            setIsError("");
            setIsSuccess("");
          }, 3000);
        })
        .catch(() => {
          setIsError("An unexpected error occurred.");
          setTimeout(() => {
            setIsError("");
            setIsSuccess("");
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
                  placeholder="* * * * * * * * *"
                  className="shad-input"
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
          {isPending ? "SignIn..." : "Sign in"}
        </Button>
      </form>
      <div className="h-[1px] bg-gray-700 mt-4 w-1/2 mx-auto" />
      <SocialLoginButtons type="Sign in" />
    </Form>
  );
};

export default SignInForm;
