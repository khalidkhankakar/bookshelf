import React from 'react'
import UserProfile from '../../(components)/user-profile'

const page = async ({params}:{params:{id:string}}) => {
  await new Promise((resolve)=>setTimeout(resolve,6000))
  
  return (
    <div className='text-white'>
    
    <UserProfile name='Khalid Khan' 
    email={'qIi6g@example.com'}
    bio={'    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione assumenda animi tempora quidem voluptas delectus autem, nam iusto, itaque dolores illum earum culpa quo corrupti non quae dignissimos! Non, veritatis?'}
    location={'Killa saifullah'}
    twitterHandle={'khalid_khan'}
    instagramHandle={'khalid_khan'}
    avatarUrl={'https://khliad'}
    coverImageUrl={'https://dummyimage.com/720x400'}
    books={[{id:'1', title:'khaid', coverUrl:'https://dummyimage.com/720x400'}]}
    />

    </div>
  )
}

export default page
