"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalSearchResults from "./global-search-results";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@/hooks/use-debounce";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategorySearch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [type, setType] = useState<string>("all");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    if (e.target.value === "" && isOpen) setIsOpen(false);
  };
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const devSearchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        devSearchRef.current &&
        event.target instanceof Node && // Ensure event.target is a DOM node
        !devSearchRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={devSearchRef}
      className="flex relative flex-col mx-auto w-[90vw] max-w-2xl  gap-y-2 "
    >
      <div className="flex  shad-input rounded-3xl items-center space-x-2 px-3 py-2">
        <Select
          onValueChange={(prevValue: string) => setType(prevValue as string)}
          value={type}   

        >
          <SelectTrigger   className="shad-select-trigger border-none  py-0 w-[20%] ">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent className="shad-select-content py-0  text-white">
            <SelectGroup >
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="publisher">Publisher</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="relative flex-grow  w-full border-none ">
          <Input
            onChange={handleChange}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className=" border-none outline-none focus-visible:ring-0 text-lg p-2"
          />
        </div>
        <Button type="submit">
          <Search />
        </Button>
      </div>
      {isOpen && (
        <GlobalSearchResults type={type} debounceValue={debouncedSearchTerm} />
      )}
    </div>
  );
}
