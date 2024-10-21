"use client";
import StarRating from "./star-rating";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertDeleteDialog } from "@/components/shared/alert-dialog";
import { startTransition } from "react";
import { deleteBookById } from "@/lib/actions/books-api.actions";
import { useToast } from "@/hooks/use-toast";
import { ListCheck, SaveOff,  Trash } from "lucide-react";
import { addAndRemoveBookInHaveToRead, addAndRemoveBookInSave } from "@/lib/actions/user.actions";
import { useSession } from "next-auth/react";

interface BookCardProps {
  bookId: string;
  bookDesc: string;
  bookTitle: string;
  bookAuthors: string;
  bookImage: string;
  bookRating: number;
  isValidUser?: boolean | null;
  userId?: string | null;
}

const BookCard = ({
  bookId,
  bookTitle,
  bookAuthors,
  bookDesc,
  bookImage,
  bookRating,
  isValidUser,
  userId,
}: BookCardProps) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const { data: session } = useSession();
  const handleDeleteBook = async (bId: string) => {
    if (!userId)
      return toast({
        title: "LogIn",
        description: "Please login to perfrom this action",
        variant: "destructive",
      });
    startTransition(() => {
      deleteBookById(bId, userId)
        .then((res) => {
          if (!res?.success)
            return toast({
              title: "Unable to delete",
              description: "Oh no! Something went wrong",
              variant: "destructive",
            });
          if (res?.success)
            return toast({
              title: "Delete successfully",
              description: "Book has been deleted successfully",
            });
        })
        .catch((err: any) => {
          console.error(err);
          return toast({
            title: "Unable to delete",
            description: "Oh no! Something went wrong",
            variant: "destructive",
          });
        });
    });
  };

  const handleUnSavePost = (bId: string) => {
    if (!session)
      return toast({
        title: "LogIn",
        description: "Please login to perfrom this action",
        variant: "destructive",
      });

    startTransition(() => {
      addAndRemoveBookInSave(true, bId, session?.user?.id as string)
        .then((res: any) =>
          res.success
            ? toast({ title: "Book is unsaved successfully" })
            : toast({ title: "Something went wrong", variant: "destructive" })
        )
        .catch(() => {
          return toast({ title: "unable to save", variant: "destructive" });
        });
    });
  };

  const handleRemoveFromHaveToReadList = (bId:string) => {
    if (!session)
      return toast({
        title: "LogIn",
        description: "Please login to perfrom this action",
        variant: "destructive",
      });

      startTransition(() => {
        addAndRemoveBookInHaveToRead(
          true,
          bId,
          session?.user?.id as string
        )
          .then((res: any) =>
            res.success
              ? toast({ title: "Book is removed from  have to category" })
              : toast({ title: "Something went wrong",variant: "destructive" })
          )
          .catch(() => {
            return toast({ title: "Unable to remove book from  have to remove category" ,variant: "destructive"});
          });
      });
  };

  return (
    <div className="p-4 md:w-1/3 relative">
      {pathname.startsWith("/profile") && isValidUser && (
        <div className="btns flex items-center space-x-3 absolute top-8 right-8">
          <AlertDeleteDialog
            title={"Delete Book"}
            desc={"Are you sure to delete this book?"}
            bookId={bookId}
            handleRemove={handleDeleteBook}
          >
            <Trash size={15} />
          </AlertDeleteDialog>
        </div>
      )}
      {pathname.startsWith("/save") && (
        <div className="btns flex items-center space-x-3 absolute top-8 right-8">
          <AlertDeleteDialog
            title={"Remove book"}
            desc={"Are you sure remove this book from save list?"}
            bookId={bookId}
            handleRemove={handleUnSavePost}
          >
            <SaveOff size={15} />
          </AlertDeleteDialog>
        </div>
      )}
            {pathname.startsWith("/have-to-read") && (
        <div className="btns flex items-center space-x-3 absolute top-8 right-8">
          <AlertDeleteDialog
            title={"Remove book from have to read list"}
            desc={"Are you sure remove this book from have to read list?"}
            bookId={bookId}
            handleRemove={handleRemoveFromHaveToReadList}
          >
            <ListCheck size={15} />
          </AlertDeleteDialog>
        </div>
      )}
      <div className="h-full border-2 border-gray-800 border-opacity-60 rounded-lg overflow-hidden">
        <Image
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={bookImage}
          width={721}
          height={401}
          alt="blog"
          priority
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {bookAuthors}
          </h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">
            {bookTitle?.substring(0, 20)} ...
          </h1>
          <p className="leading-relaxed text-gray-500  text-sm mb-3">
            {bookDesc?.substring(0, 100)} ...
          </p>
          <div className="flex items-center flex-wrap justify-between ">
            <Link
              href={`/book/${bookId}`}
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
            >
              Book Details
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
            <StarRating rating={bookRating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
