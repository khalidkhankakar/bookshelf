'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NoResultProps {
  title: string
  message: string
}

export default function NoResult({ title, message }: NoResultProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-32  text-white p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 text-gray-300">{message}</p>
        <Button
          onClick={() => router.back()}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Go Back
        </Button>
      </div>
    </div>
  )
}