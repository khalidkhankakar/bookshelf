import BookSection from '../(components)/book-section'

const page = async() => {
  return (
    <div className='w-full'>
      <BookSection title={"Science"}  />
      <BookSection title={"Technology"}  />
    </div>
  )
}

export default page
