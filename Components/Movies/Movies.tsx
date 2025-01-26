import React from 'react'
import Card from '../Card/Card'

const Movies = () => {
  return (
    <div className=' py-6 w-full     bg-zinc-300 px-4'>
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>

     </div>
      

    </div>
  )
}

export default Movies
