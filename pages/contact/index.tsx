import Footer from '@/Components/Footer/Footer'
import Link from 'next/link'
import React from 'react'

const Contact = () => {
  return (
    <div className='w-full min-h-screen flex flex-col'>
    <header className='p-4'>
      <Link href="/">  <button className=' text-orange-500'>Home</button>
    
      </Link>
    </header>
    <div className=' w-3/4 lg:w-1/2 m-auto text-white text-center'>
    
    <h1 className=' font-medium text-4xl text-orange-500'>Contact us</h1>
          <div>
            <form className='p-4 border-2 text-black mt-4 border-orange-500 rounded-md flex flex-col gap-4' action="">
              <input className=' rounded-md p-2' type="name"
              placeholder='name'
              
              />
              <input className=' p-2 rounded-md' type="text" placeholder='surname' />
              <input  className=' p-2 rounded-md' type="email"  placeholder='email'/>
              <textarea className='p-2 rounded-md' name="" id=""
              placeholder='write yor message here'
              ></textarea>
              <button className=' w-full p-2 rounded-md bg-orange-500'> Send </button>
            </form>
          </div>
    </div>
    <Footer/>
    
        </div>
  )
}

export default Contact
