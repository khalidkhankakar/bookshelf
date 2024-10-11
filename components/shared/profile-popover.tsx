import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  BookMarked,
  Bookmark,
  Edit2,
  Eye,
  Heart,
  LogOut,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface ProfilePopoverProps {
  fullName: string;
  email: string;
  avatarUrl: string;
  userId: string;
}

export default function ProfilePopover({
  fullName,
  email,
  avatarUrl,
  userId,
}: ProfilePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full hover:bg-gray-800"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-gray-700 text-white">
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-900 border-gray-700 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-gray-700 text-white">
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-semibold text-white">{fullName}</h4>
            <p className="text-sm text-gray-400">{email}</p>
          </div>
        </div>
        <Separator className="my-4 bg-gray-700" />
        <nav className="space-y-2">
        <Link href={`/profile/${userId}`}>
        <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <Eye className="mr-2 h-4 w-4 text-white" />
            <p className="text-white">View Profile</p>
          </Button>
        </Link>

        <Link href={`/profile/edit/${userId}`}>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <Edit2 className="mr-2 h-4 w-4 text-white" />
            <p className="text-white">Update Profile</p>
          </Button>
        </Link>

        <Link href={`/saved/${userId}`}>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <Bookmark className="mr-2 h-4 w-4 text-white" />
            <p className="text-white"> Saved Posts</p>
          </Button>
          </Link>
          <Link href={`/have-to-read/${userId}`}>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <BookMarked className="mr-2 h-4 w-4 text-white" />
            <p className="text-white">To Read</p>
          </Button>
          </Link>
          <Link href={`/fav/${userId}`}>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <Heart className="mr-2 h-4 w-4 text-white" />
            <p className="text-white">Favorites</p>
          </Button>
          </Link>
          <Link href={`/currently-reading/${userId}`}>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-gray-800"
          >
            <User className="mr-2 h-4 w-4 text-white" />
            <p className="text-white">Currently Reading</p>
          </Button>
          </Link>
        </nav>
        <Separator className="my-4 bg-gray-700" />
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
        >
          <LogOut className="mr-2 h-4 w-4 text-red-400" />
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
