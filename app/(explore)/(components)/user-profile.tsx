import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Twitter, Instagram, Edit, Book } from "lucide-react"
import Image from "next/image"

interface UserProfileProps {
  name: string
  email: string
  bio?: string
  location?: string
  twitterHandle?: string
  instagramHandle?: string
  avatarUrl: string
  coverImageUrl: string
  books: Array<{ id: string; title: string; coverUrl: string }>
}

export default function UserProfile({
  name,
  email,
  bio,
  location,
  twitterHandle,
  instagramHandle,
  avatarUrl,
  coverImageUrl,
  books
}: UserProfileProps) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="relative h-48 md:h-64 lg:h-80">
        <Image
          src={coverImageUrl}
          alt="Cover"
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="relative -mt-20 mb-8 flex flex-col items-center md:flex-row md:items-end">
          <Avatar className="w-32 h-32 border-4 border-gray-900">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="mt-4 md:ml-6 md:mt-0 text-center md:text-left">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-gray-400">{email}</p>
            {location && (
              <p className="flex items-center justify-center md:justify-start mt-2 text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                {location}
              </p>
            )}
          </div>
          <div className="mt-4 md:ml-auto">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        {bio && (
          <Card className="mb-8 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <p className="text-gray-300">{bio}</p>
            </CardContent>
          </Card>
        )}
        <div className="flex flex-wrap gap-4 mb-8">
          {twitterHandle && (
            <a
              href={`${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300"
            >
              <Twitter className="w-5 h-5 mr-2" />
              @{twitterHandle}
            </a>
          )}
          {instagramHandle && (
            <a
              href={`${instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-pink-400 hover:text-pink-300"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @{instagramHandle}
            </a>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Book className="w-6 h-6 mr-2" />
            Created Books
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <Card key={book.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover mb-2 rounded"
                    width={300}
                    height={300}
                  />
                  <p className="text-sm font-medium truncate">{book.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}