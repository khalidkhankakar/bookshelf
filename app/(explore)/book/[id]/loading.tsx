import { Skeleton } from "@/components/ui/skeleton"

export default function BookDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Skeleton className="w-full aspect-[3/4] rounded-lg bg-gray-800" />
          </div>
          <div className="md:w-2/3">
            <div className="flex justify-between items-start mb-4">
              <div className="w-full">
                <Skeleton className="h-10 w-3/4 mb-2 bg-gray-800" />
                <Skeleton className="h-6 w-1/2 mb-4 bg-gray-800" />
              </div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} className="w-8 h-8 rounded-md bg-gray-800" />
                ))}a
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="w-5 h-5 mr-1 bg-gray-800" />
                ))}
              </div>
              <Skeleton className="w-12 h-5 bg-gray-800" />
            </div>
            <Skeleton className="h-6 w-24 mb-4 bg-gray-800" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-3/4 mb-4 bg-gray-800" />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <Skeleton className="h-5 w-24 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
              <div>
                <Skeleton className="h-5 w-24 mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-32 bg-gray-800" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}