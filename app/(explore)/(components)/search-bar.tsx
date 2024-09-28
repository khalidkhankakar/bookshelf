import * as React from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function CategorySearch() {
  return (
    <div className="flex mx-auto w-[90vw] rounded-3xl   max-w-2xl items-center space-x-2 border border-white/5 bg-white/5 px-3 py-2">
      <Select >
        <SelectTrigger className=" flex-1 px-4 border-none">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent className="bg-white/5 text-white">
          <SelectItem className='hover:bg-white/10' value="all">All</SelectItem>
          <SelectItem className='hover:bg-white/10' value="electronics">Electronics</SelectItem>
          <SelectItem className='hover:bg-white/10' value="clothing">Clothing</SelectItem>
          <SelectItem className='hover:bg-white/10' value="books">Books</SelectItem>
          <SelectItem className='hover:bg-white/10' value="home">Home & Garden</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-grow w-full border-none ">
        <Input type="text" placeholder="Search..." className=" border-none shadow-none" />    
      </div>
      <Button type="submit">
      <Search />
      </Button>
    </div>
  )
}