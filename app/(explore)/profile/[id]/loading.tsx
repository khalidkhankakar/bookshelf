import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function UserProfileSkeleton() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative h-48 md:h-64 lg:h-80">
        <Skeleton className="w-full h-full bg-gray-800" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="relative -mt-20 mb-8 flex flex-col items-center md:flex-row md:items-end">
          <Skeleton className="w-32 h-32 rounded-full bg-gray-700" />
          <div className="mt-4 md:ml-6 md:mt-0 text-center md:text-left">
            <Skeleton className="h-8 w-48 mb-2 bg-gray-700" />
            <Skeleton className="h-4 w-40 mb-2 bg-gray-700" />
            <Skeleton className="h-4 w-32 bg-gray-700" />
          </div>
          <div className="mt-4 md:ml-auto">
            <Skeleton className="h-10 w-32 bg-gray-700" />
          </div>
        </div>
        <Card className="mb-8 bg-gray-900 border-gray-700">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-700" />
          </CardContent>
        </Card>
        <div className="flex flex-wrap gap-4 mb-8">
          <Skeleton className="h-6 w-32 bg-gray-700" />
          <Skeleton className="h-6 w-32 bg-gray-700" />
        </div>
        <div>
          <Skeleton className="h-8 w-48 mb-4 bg-gray-700" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <Skeleton className="w-full h-48 mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-full bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}