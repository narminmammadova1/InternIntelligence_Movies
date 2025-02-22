
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from 'next/router';
import {  signOut } from "firebase/auth";
import {auth} from "../../firebase"
import Sidebar from '../Sidebar/Sidebar';

import {motion} from 'framer-motion'
import { cardVariants, liVariants, sidebarVariants } from '@/motions';

interface HeaderProps {
  onGenreChange: (genre: string) => void;
  onSearchChange:(search:string)=>void
}

const  Header: React.FC<HeaderProps> = ({ onGenreChange,onSearchChange }) => {

  const router=useRouter()
  const {push}=router
  const [genre, setGenre] = useState("")
const [searchQuery,setSearchQuery]=useState("")

const [debouncedSearchQuery]=useDebounce(searchQuery,1000)

const [isLogin, setIsLogin] = useState<null | string>(null);
const [ modal,setModal]=useState(false)
const [sidebar,setSidebar]=useState(false)
  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre) 
    onGenreChange(selectedGenre);
    localStorage.setItem("loginAndIsFav","false")
console.log(genre);


  }

  useEffect(() => {
    if (debouncedSearchQuery) {
setSearchQuery(""); 
      
    } 
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); 
  };
  
  useEffect(() => {
    if (debouncedSearchQuery) {
      onSearchChange(debouncedSearchQuery); 
        }
  }, [debouncedSearchQuery, onSearchChange]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginStatus = localStorage.getItem("isLogin");
      setIsLogin(loginStatus);
    }
  }, []);
const handleLogout=()=>{
  localStorage.removeItem("isLogin")
  setIsLogin(null)
  signOut(auth)
  localStorage.removeItem("loggedUser")

}
const handleGetFavorites=()=>{
  if(isLogin==null){

  setModal(true)
  
  }
  else{
    setModal(false)
localStorage.setItem("loginAndIsFav","true")
console.log("fava tiklandi");
push("/favorites")



  }
}
const closeModal=()=>{
  setModal(false)
}

useEffect(() => {
  if (modal) {
    document.body.style.overflow = 'hidden';  
  } else {
    document.body.style.overflow = 'auto';  
  }
}, [modal]);

  return (
    <header className='bg-slate-900 w-full'>
      <div className='flex items-center justify-between ps-6'>
        <div
       
       
        className=' text-2xl lg:text-4xl text-orange-500'>
          <h1 
       >MovieLand</h1>
        </div>
        <div className='hidden md:block' >
          <ul className='flex text-orange-500 justify-end gap-8 me-6'>
            <motion.li   variants={liVariants}
                initial="initial"
                whileHover="whileHover"
               ><Link href="/">Home</Link></motion.li>
            <motion.li variants={liVariants}
                initial="initial"
                whileHover="whileHover"
               ><Link href="/about">About</Link></motion.li>
            <motion.li 
            variants={liVariants}
                initial="initial"
                whileHover="whileHover"
                ><Link href="/contact">Contact</Link></motion.li>
            {isLogin === 'true' ? (
              <Link href="/">
                <motion.button
                 variants={liVariants}
                 initial="initial"
                 whileHover="whileHover" 
                onClick={
                  handleLogout
           } className='border-2 rounded-lg border-orange-500 px-2'>
                  Logout
                </motion.button>
              </Link>
            ) : (
              <Link href="/login">
                <motion.button 
                 variants={liVariants}
                initial="initial"
                whileHover="whileHover" className='border-2 rounded-lg border-orange-500 px-2'>
                  Sign In
                </motion.button>
              </Link>
            )}
           
            
          </ul>
        </div>
        <div onClick={()=>{setSidebar(true)}}  className='cursor-pointer block md:hidden  me-6'><GiHamburgerMenu color="white" size={28} />
        </div>
      </div>

      <div className='bg-orange-500 flex justify-end items-center py-2 pe-6'>
        <div className='hidden md:block'>
          <ul className='flex text-white gap-8 me-6'>
          <motion.li 
           variants={liVariants}
           initial="initial"
           whileHover="whileHover"
          className=' cursor-pointer'  onClick={() => handleGetFavorites()}>My Favorites</motion.li>

            <motion.li 
             variants={liVariants}
             initial="initial"
             whileHover="whileHover"
             className=' cursor-pointer bg-red-500 bg-opacity-10 border-0 rounded-full' onClick={() => handleGenreClick("Action")}>Action</motion.li>
            <motion.li
             variants={liVariants}
             initial="initial"
             whileHover="whileHover"
            
            className=' cursor-pointer'  onClick={() => handleGenreClick("Comedy")}>Comedy</motion.li>
            <motion.li 
             variants={liVariants}
             initial="initial"
             whileHover="whileHover"
            className=' cursor-pointer'  onClick={() => handleGenreClick("Animation")}>Animation</motion.li>
            <motion.li
             variants={liVariants}
             initial="initial"
             whileHover="whileHover" className=' cursor-pointer'  onClick={() => handleGenreClick("Drama")}>Drama</motion.li>
            <motion.li  variants={liVariants}
                initial="initial"
                whileHover="whileHover" className=' cursor-pointer'  onClick={() => handleGenreClick("")}>All</motion.li>

          </ul>
        </div>
        <div className='w-full md:w-1/5 flex justify-center'>
          <input 
          value={searchQuery}
           onChange={handleSearchChange}
           className='px-2 w-3/4 md:w-full rounded-md' placeholder='search' type="search" />
        </div>
       
      </div>
      
      {modal && (
        <div className="modal-overlay fixed top-0  left-0 w-full h-full bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="modal-content bg-white text-center rounded-md h-[30%] w-1/2 ">
            <h2 className=' text-lg text-orange-500 font-semibold mt-10'>Please log in to see your favorites!</h2>
            <motion.button 
             variants={cardVariants}
            initial="initial"
             whileHover="whileHover"  onClick={closeModal} className="px-4 py-1 border-2  bg-orange-500 text-white font-bold rounded-lg">Close</motion.button>
            <motion.button 
             variants={cardVariants}
                                      initial="initial"
                                      whileHover="whileHover"
            onClick={()=>{
              push("/login")
            }} className="px-4 py-1 border-2  bg-orange-500 text-white font-bold rounded-lg">Sign in</motion.button>

          </div>
        </div>
      )}

{sidebar && (
  <motion.div
    variants={sidebarVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="top-0 md:hidden right-0 fixed  z-50"
  >
    <Sidebar handleLogout={handleLogout} isLogin={isLogin} handleGenreClick={handleGenreClick} handleGetFavorites={handleGetFavorites} setSidebar={setSidebar} />
  </motion.div>
)}

    </header>

  )
}

export default Header
