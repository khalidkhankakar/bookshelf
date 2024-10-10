import BookSection from '../(components)/book-section'
import BookSectonDB from '../(components)/book-section-db'

const page = async() => {
  return (
    <div className='w-full'>
      <BookSectonDB  title={"All Books"} />
      <BookSection title={"Science"}  />
      <BookSection title={"Technology"}  />
    </div>
  )
}

export default page
