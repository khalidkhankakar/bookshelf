import { Skeleton } from "@/components/ui/skeleton"

function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg flex flex-col">
          <Skeleton className="w-full h-40 mb-2 rounded bg-gray-700" />
          <Skeleton className="h-4 w-3/4 mb-1 bg-gray-700" />
          <Skeleton className="h-3 w-1/2 mb-1 bg-gray-700" />
          <Skeleton className="h-3 w-1/3 mb-2 bg-gray-700" />
          <div className="flex">
            {[...Array(5)].map((_, starIndex) => (
              <Skeleton key={starIndex} className="w-4 h-4 mr-1 bg-gray-700" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ExploreLoading() {
  return (
    <div className="  text-gray-100 p-3">
      <Skeleton className="h-10  w-3/4  mb-4 bg-gray-900" />
      <BookGridSkeleton />
      <div className="flex justify-center mt-3 mb-6">
        <Skeleton className="h-10 w-32 bg-gray-9S00" />
      </div>
    </div>
  )
}