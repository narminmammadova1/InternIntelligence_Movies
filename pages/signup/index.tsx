import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <div className=''>
          <header className='p-4'>
      <Link href="/">  <button className=' text-orange-500'>Home</button>
    
      </Link>
    </header>
    <div className='w-1/2 m-auto mt-10 text-white text-center'>
        <h1 className='text-4xl text-orange-500'>Sign Up</h1>
    <form className='p-4 border-2  text-black mt-4 border-orange-500 rounded-md flex flex-col gap-4' action="">
            <input  className='p-2 rounded-md text-black' type="text" placeholder="name" />
<input className='p-2 rounded-md text-black' type="text" placeholder="surname"/>
<input  className='p-2 rounded-md text-black' type="email" placeholder="email"/>
<input  className='p-2 rounded-md text-black' type="password"  placeholder='password'/>
<input  className='p-2 rounded-md text-black' type="password"  placeholder='repeat password'/>


<button className=' w-full rounded-md bg-orange-500 p-2'>Sign Up</button>


      </form>
    </div>
          
    </div>
  )
}

export default SignUp
