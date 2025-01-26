import Image from 'next/image'
import React from 'react'

const Card = () => {
  return (
    <div className='w-[250px] h-[300px] border-dotted border-2 rounded-md '>
      <Image className=' w-full' src="/22.jpg" width={200} height={200} alt='movie'/>
   <div className=' border-t-2 text-center'> <h1>film name</h1>
   <p>qualifity</p></div>
  
    </div>
  )
}

export default Card
