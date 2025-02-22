import { useRouter } from 'next/router'
import React from 'react'


interface SidebarProps {
  handleGenreClick: (genre: string) => void; 
  handleGetFavorites: () => void;
  setSidebar: (value: boolean) => void;
}

const Sidebar:React.FC<SidebarProps> = ({handleGenreClick,handleGetFavorites,setSidebar}) => {
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
                <li onClick={()=>{push("/login")}}>Sign In</li>

            </ul>
        </div>
      
    </div>
  )
}

export default Sidebar
