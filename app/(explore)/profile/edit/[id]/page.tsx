import UpdateUserProfileForm from '@/app/(explore)/(components)/user-update-form'
import { auth } from '@/auth'
import { fetchUserProfileById } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async({params}:{params:{id:string}}) => {

  const id = params.id
  const session = await auth()
  if(!session || (session?.user?.id !== id) ) redirect('/auth/sign-in')
  const user = await fetchUserProfileById(id)
  if(!user) redirect('/explore');
  return (
    <div className='text-white'>
    <UpdateUserProfileForm userId={user.id || ''} userData= {JSON.stringify(user)}  />
    </div>
  )
}

export default page
