'use client'

import { signOut } from "next-auth/react"

const ClientComp = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default ClientComp
