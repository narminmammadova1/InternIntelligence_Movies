import { MovieType } from '@/interfaces/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Details = () => {
const router=useRouter()
const {id}=router.query
const [movieDetails, setMovieDetails] = useState<MovieType | null>(null);
const apiKey="7b948acabbc0eafc206827b05a3ac9b7"

const getDetails=async()=>{

    if(id){
        const url=`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        
        try{
        const response=await fetch(url)
        const data=await response.json()
        setMovieDetails(data)
        console.log("gelen detal",data);
       
        
        }catch(err){console.log(err);
        }
        
        
            }
}
  
useEffect(()=>{
    getDetails()
},[id])

const imageUrl = movieDetails?.poster_path
? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
: '';

if (!movieDetails) return<div className="flex w-full h-screen justify-center items-center">
<div className=" w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full   animate-spin"></div>
</div>

  return (
    <div className=''>
        <header className='p-4'>
      <Link href="/">  <button className=' text-orange-500'>Home</button>
    
      </Link>
    </header>
    <div className='flex justify-start gap-10 text-white m-10'>
      <div className=' rounded-md'>
        <Image className='bg-red-800 rounded-md  w-[350px] h-[400px]' src={imageUrl}  width={200} height={200} alt='detail'/>
      </div>
      <div className='w-1/2 text-orange-500 font-bold '>
        <h1 className='text-4xl text-orange-500 '>{movieDetails.title}</h1>
        <hr />

        <p className='my-2 '>Years: <span className='text-white  font-normal  '> {movieDetails.release_date}</span></p>
       <p> Category: <span  className='text-white  font-normal  '> {movieDetails.genres.map((genre) => genre.name).join(' , ')}</span> 
       </p>
        <p className='my-2'>language: <span className='text-white  font-normal  '>{movieDetails?.original_language}</span> </p>
        <p className='my-2'>Description: <span className='text-white  font-normal  '>  {movieDetails.overview}</span></p>
      </div>
    </div>
    </div>
  )
}

export default Details
