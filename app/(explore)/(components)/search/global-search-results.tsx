"use client";
import { fetchGlobalResults } from "@/lib/actions/global-search.actions";
import { Book, LoaderCircle, TagIcon, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import HighlightText from "./highlight-text";

interface GlobalSearchResultsProps {
  type: string;
  debounceValue: string;
}
const GlobalSearchResults = ({
  debounceValue,
  type,
}: GlobalSearchResultsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // TODO: fix type
  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {
    if (debounceValue.length <= 0) return;

    const fetchResult = async () => {
      try {
        setIsLoading(true);
        const res = await fetchGlobalResults({
          query: debounceValue,
          category: type,
        });
        setResult([...res]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [type, debounceValue]);

  return (
    <div className=" w-[95%] mx-auto rounded-lg p-4 min-h-32 bg-dark-400 flex  flex-col justify-between">
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center ">
          <LoaderCircle size={30} className="animate-spin " />
        </div>
      ) : result.length > 0 ? (
        <div className="my-2 w-full space-y-2">
          {result.map((item) => (
            <Link
              key={item.id}
              href={`
                ${
                  item.type === "publisher"
                    ? `/publisher/${item.title}`
                    : item.type === "book"
                    ? `/book/${item.id}`
                    : item.type === "author"
                    ? `/profile/${item.id}`
                    : `/book-category/${item.title}`
                }
              `}
              className="flex items-center jucbtify-between w-full py-2 px-4 bg-slate-800 rounded-lg"
            >
              <HighlightText text={item.title} searchTerm={debounceValue} />
              {item.type === "book" ? (
                <Book size={16} />
              ) : item.type === "author" ? (
                <User size={16} />
              ) : (
                <TagIcon size={16} />
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center mt-4">
          <p className="text-red-500 font-semibold text-lg ">
            Oops! No results found with this query
          </p>
        </div>
      )}
      <p className="text-gray-300 italic text-sm text-center   ">
        All expected results{" "}
      </p>
    </div>
  );
};

export default GlobalSearchResults;
