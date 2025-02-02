import { MovieType } from '@/interfaces/interfaces';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState } from 'react'


const Card = ({movie}:{movie:MovieType}) => {
const router=useRouter()
const {push}=router
  const imageUrl = movie.poster_path
  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  : '';

  return (
    <div onClick={()=>{
      push(`/details?id=${movie.id}`)
    }}
    className=' bg-orange-400 p-2 text-white  border-white  w-[250px] h-[350px] border-dotted border-2 '>
 <div className='w-full h-[280px] relative  bg-red-900rounded-md '>
      <Image   className=' object-cover   w-full h-full' src={imageUrl} width={200} height={200} alt='movie'/>
   <div className=' border-t-2 text-center '> <h1 className=' font-bold overflow-hidden whitespace-nowrap text-ellipsis'>{movie.title}</h1>
   <div className='w-[20px] h-[20px] bg-red-800 absolute top-0 right-0 me-2 mt-2'>fav</div>
   <p>{movie.release_date.slice(0,4)}</p></div>
  
    </div>
    </div>

   
  )
}

export default Card
