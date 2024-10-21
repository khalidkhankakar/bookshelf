import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

export function AlertDeleteDialog({
  children,
  title,
  desc,
  bookId,
  handleRemove,
}: {
  children:React.ReactNode
  title: string;
  desc: string;
  bookId: string;
  handleRemove: (arg: string) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'} >
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-400 text-white border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
          <AlertDialogAction
          onClick={() => handleRemove(bookId)}
           className="bg-red-600 hover:bg-red-700 ">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
