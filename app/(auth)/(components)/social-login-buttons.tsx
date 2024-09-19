'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const SocialLoginButtons = ({type}:{type:string}) => {
  return (
<div className="mt-6 space-y-2">
        <Button variant="outline" className="w-full" onClick={() => {}}>
          <Image src='/icons/google.svg' alt="Google" width={20} height={20}  className="w-5 h-5 mr-2" />
          {type} with Google
        </Button>
        <Button variant="outline" className="w-full" onClick={() => {}}>
        <Image src='/icons/github.svg' alt="Google" width={20} height={20}  className="w-5 h-5 mr-2" />
          {type} with GitHub
        </Button>
      </div>
  )
}

export default SocialLoginButtons
