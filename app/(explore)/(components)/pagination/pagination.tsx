"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function BookPagination({
  totalPages,
  currentPage,
  totalResults,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}) {
  const [myCurrentPage, setMyCurrentPage] = useState<number>(currentPage);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const handleChangePage = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value.toString());
      return params.toString();
    },
    [searchParams]
  );
  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => {
              router.push(
                pathname + "?" + handleChangePage("page", currentPage - 1)
              );
              setMyCurrentPage((page) => page - 1);
            }}
            disabled={myCurrentPage <= 1}
          >
            Previous
          </Button>
        </PaginationItem>

        {pageArr.map((page) => (
          <PaginationItem key={page}>
            <Button
              onClick={() => {
                router.push(pathname + "?" + handleChangePage("page", page));
                setMyCurrentPage(page);
              }}
              className={`bg-slate-600 cursor-pointer size-10 flex items-center justify-center rounded-lg text-white ${
                myCurrentPage === page ? "bg-slate-200 text-black" : ""
              }`}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <Button
            onClick={() => {
              router.push(
                pathname + "?" + handleChangePage("page", currentPage + 1)
              );
              setMyCurrentPage((page) => page + 1);
            }}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
