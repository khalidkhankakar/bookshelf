import { Star, StarHalf } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ) : star - 0.5 <= rating ? (
              <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="w-4 h-4 text-gray-300" />
            )}
          </span>
        ))}
      </div>
    )
  }

  export default StarRating;