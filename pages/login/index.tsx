import { signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
 import {auth} from "../../firebase"
import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { cardVariants} from '@/motions'

const Login = () => {
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [error,setError]=useState("")
 const router=useRouter()
//  const [isLoginn,setIsLoginn]=useState(false)

const handleLogin=async(e:React.FormEvent<HTMLFormElement>)=>{

  e.preventDefault()
  try{
await signInWithEmailAndPassword(auth ,email,password)
// setIsLoginn(true)
localStorage.setItem("isLogin","true")

router.push("/")

  }catch(err){
    setError("invalid email or password")
    console.log("login error",err);
    
  }
}

  return (
    <div className=''>
      <header className='p-4'>
        <Link href="/">
          <button className='text-orange-500'>Home</button>
        </Link>
      </header>
      
      <div className='w-1/2 m-auto mt-10 text-white text-center'>
        <h1 className='text-4xl text-orange-500'>Sign In</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form 
          className='p-8 border-2 text-black mt-4 border-orange-500 rounded-md flex flex-col gap-4' 
          onSubmit={handleLogin}  
        >
          <input 
            className='p-2 rounded-md text-black' 
            type="email" 
            placeholder='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <input 
            className='p-2 rounded-md text-black' 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <motion.button   variants={cardVariants}
                          initial="initial"
                          whileHover="whileHover"
            type="submit" 
            className='w-full bg-orange-500 p-2 rounded-md'
          >
            Sign In
          </motion.button>
        </form>
        <div className=''>
  <p className=' inline-block pe-4'>If you don't have an account?</p>
  <Link href="/signup">
    <button className="text-orange-500 mt-4">Sign Up</button>
  </Link>
</div>
       
      </div>
    </div>
  )


}

export default Login
