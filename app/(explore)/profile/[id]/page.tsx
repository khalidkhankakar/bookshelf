import React from 'react'
import UserProfile from '../../(components)/user-profile'
import { fetchUserProfileById } from '@/lib/actions/user.actions';

const page = async ({params}:{params:{id:string}}) => {

  const id = params.id;
  if(!id) return <div>User not found</div>

  const user = await fetchUserProfileById(id)
  
  if(!user) return <div>User not found</div>

  return (
    <UserProfile name={user.name}
    email={user.email}
    userId={id}
    bio={user?.bio || ''}
    location={user?.location || ''}
    twitterHandle={user?.twitterUrl ||''}
    instagramHandle={user?.instagramUrl || ''}
    avatarUrl={user.image || 'https://dummyimage.com/720x400'}
    coverImageUrl={user.coverImage || 'https://dummyimage.com/720x400'}
    books={user.userBooks || []}
    />
  )
}

export default page
