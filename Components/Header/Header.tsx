

import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
  const [genre, setGenre] = useState("")

  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre) 
    localStorage.setItem("genre", selectedGenre) 
   
    localStorage.removeItem("setDrama")
    localStorage.removeItem("setComedy")
    localStorage.removeItem("setAnimation")
    localStorage.removeItem("setAction")
    localStorage.setItem(`set${selectedGenre}`, "true")
  }

  return (
    <header className='bg-slate-900'>
      <div className='flex items-center justify-between ps-6'>
        <div className='text-4xl text-orange-500'>
          MovieLand
        </div>
        <div>
          <ul className='flex text-orange-500 justify-end gap-8 me-6'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <button className='border-2 rounded-lg border-orange-500 px-2'>
              <Link href="/login">Sign in</Link>
            </button>
          </ul>
        </div>
      </div>

      <div className='bg-orange-500 flex justify-end items-center py-2 pe-6'>
        <div>
          <ul className='flex text-white gap-8 me-6'>
            <li className=' cursor-pointer' onClick={() => handleGenreClick("Action")}>Action</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Comedy")}>Comedy</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Animation")}>Animation</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Drama")}>Drama</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("")}>All</li>

          </ul>
        </div>
        <div>
          <input className='px-2 rounded-md' placeholder='search' type="search" />
        </div>
      </div>
    </header>
  )
}

export default Header
