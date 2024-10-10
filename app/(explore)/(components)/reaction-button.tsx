"use client";
import TooltipProvider from "@/components/shared/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  addAndRemoveBookInHaveToRead,
  addAndRemoveBookInLike,
  addAndRemoveBookInSave,
} from "@/lib/actions/user.actions";
import { Bookmark, BookMarked, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { startTransition, useState } from "react";

interface ReactionButtonProps {
  type: 'like' | 'save' | 'haveToRead';
  toolipTitle: string;
  reactionArray: any[];
  bookId: string;
}

const ReactionButton = ({
  type,
  toolipTitle,
  reactionArray,
  bookId,
}: ReactionButtonProps) => {
  const bookIdArr = reactionArray.map((book) => book.bookId);
  const [isReacted, setIsReacted] = useState<boolean>(
    bookIdArr.includes(bookId)
  );
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleReaction = () => {
    if (!session) {
      return toast({ title: "Please Log In to perfrom this action" });
    }
    if (type == "save") {
      if (isReacted) {
        startTransition(() => {
          addAndRemoveBookInSave(isReacted, bookId, session?.user?.id as string)
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is unsaved" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "unable to save" });
            });
        });
      } else {
        startTransition(() => {
          addAndRemoveBookInSave(isReacted, bookId, session?.user?.id as string)
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is saved" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "unable to save" });
            });
        });
      }
    }

    if (type == "like") {
      if (isReacted) {
        startTransition(() => {
          addAndRemoveBookInLike(isReacted, bookId, session?.user?.id as string)
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is unliked" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "Unable to unliked" });
            });
        });
      } else {
        startTransition(() => {
          addAndRemoveBookInLike(isReacted, bookId, session?.user?.id as string)
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is liked" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "Unable to liked" });
            });
        });
      }
    }

    if (type == "haveToRead") {
      if (isReacted) {
        startTransition(() => {
          addAndRemoveBookInHaveToRead(
            isReacted,
            bookId,
            session?.user?.id as string
          )
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is removed from  have to category" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "Unable to remove book from  have to remove category" });
            });
        });
      } else {
        startTransition(() => {
          addAndRemoveBookInHaveToRead(
            isReacted,
            bookId,
            session?.user?.id as string
          )
            .then((res: any) =>
              res.success
                ? toast({ title: "Book is added have to read  category" })
                : toast({ title: "Something went wrong" })
            )
            .catch(() => {
              return toast({ title: "Unable to add book have read category" });
            });
        });
      }
    }

    setIsReacted(!isReacted);
  };



if(type=='like'){
  return (
    <TooltipProvider title={toolipTitle}>
    <Button
      variant="outline"
      size="icon"
      className="text-white bg-black hover:bg-slate-400"
      onClick={handleReaction}
    >
      {isReacted ? (
        <Heart className={`h-4 w-4 fill-red-600 text-red-600"`} />
      ) : (
        <Heart className={`h-4 w-4 text-white"`} />
      )}
    </Button>
  </TooltipProvider>
  )
}

if(type=="haveToRead"){
  return (
    <TooltipProvider title={toolipTitle}>
    <Button
      variant="outline"
      size="icon"
      className="text-white bg-black hover:bg-slate-400"
      onClick={handleReaction}
    >
      {isReacted ? (
        <BookMarked className={`h-4 w-4 fill-blue-600 text-blue-600"`} />
      ) : (
        <BookMarked className={`h-4 w-4 text-blue-500"`} />
      )}
    </Button>
  </TooltipProvider>
  )
}




  return (
    <TooltipProvider title={toolipTitle}>
      <Button
        variant="outline"
        size="icon"
        className="text-white bg-black hover:bg-slate-400"
        onClick={handleReaction}
      >
        {isReacted ? (
          <Bookmark className={`h-4 w-4 fill-purple-600 text-white"`} />
        ) : (
          <Bookmark className={`h-4 w-4 text-purple-500"`} />
        )}
      </Button>
    </TooltipProvider>
  );
};

export default ReactionButton;
