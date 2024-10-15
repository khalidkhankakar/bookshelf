import React from 'react'
import BookSectonDB from '../../(components)/book-section-db'

const page = ({params}:{params:{name:string}}) => {
  return (
    <BookSectonDB title={params.name} category={params.name} />
  )
}

export default page
