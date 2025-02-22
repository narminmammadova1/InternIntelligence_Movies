import { SidebarProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const Sidebar:React.FC<SidebarProps> = ({handleGenreClick,handleGetFavorites,setSidebar,handleLogout,isLogin}) => {
const router=useRouter()
const {push}=router

  return (
    <div className=' bg-orange-500 bg-opacity-70  px-2 h-screen py-2 '>
        <div onClick={()=>{
          setSidebar(false)
        }} className='mb-6 text-white text-lg rounded-full w-6 h-6 flex 
        justify-center items-center border-2  border-white'>X</div>
        <div className='  flex justify-center  text-lg text-white font-bold'>
            <ul>              
                 <li  onClick={()=>{handleGenreClick("")}}>All</li>
                <li onClick={()=>{handleGenreClick("Action")}}>Action</li>
                <li  onClick={()=>{handleGenreClick("Comedy")}}>Comedy</li>
                <li  onClick={()=>{handleGenreClick("Animation")}}>Animation</li>
                <li  onClick={()=>{handleGenreClick("Drama")}}>Drama</li>
                <li onClick={() => handleGetFavorites()}>My Favorites</li>
                <li onClick={()=>{push("/")}}>Home</li>
                <li onClick={()=>{push("/about")}}>About</li>
                <li onClick={()=>{push("/contact")}}>Contact</li>
                {isLogin === 'true' ? (
              <Link href="/">
                <button
                
                onClick={
                  handleLogout
           } className='border-2 rounded-lg border-orange-500 px-2'>
                  Logout
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button 
                className='border-2 rounded-lg border-orange-500 px-2'>
                  Sign In
                </button>
              </Link>
            )}
                {/* <li onClick={()=>{push("/login")}}>Sign In</li> */}

            </ul>
        </div>
      
    </div>
  )
}

export default Sidebar
