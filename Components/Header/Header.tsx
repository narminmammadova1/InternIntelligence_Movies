import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className=' bg-slate-900 '>
        <div className='flex items-center justify-between ps-6'>
        <div className=' text-4xl text-white'>
          MovieLand
        </div>
          <div>
          <ul className='flex text-white justify-end gap-8 me-6'>
          <li><Link href="/">Home</Link></li>

          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy</Link></li>
            <li></li>
        </ul>
          </div>
        
       
        </div>
        <div className='bg-orange-700 flex justify-end items-center py-2 pe-6'>
          <div className='' >
          <ul className='flex text-white  gap-8 me-6'>
        <li>Hollywood</li>
        <li>BollyWood</li>
        <li>Korean</li>
        <li>Series</li>
      </ul>
  
          </div>
          <div className=''>
        <input className='px-2 rounded-md ' placeholder='search' type="search" />
      </div>
        </div>
 
    </header>
  )
}

export default Header
