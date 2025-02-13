
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce';
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from 'next/router';
import { getAuth, signOut } from "firebase/auth";
import {auth} from "../../firebase"
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
const [searchResult,setSearchResult]=useState<any[]>([])
const [loading,setLoading]=useState(false)
const [isLogin, setIsLogin] = useState<null | string>(null);
const [ modal,setModal]=useState(false)


  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre) 
    onGenreChange(selectedGenre);
  }
  const searchMovies= async (query:string)=>{

    const apiKey = '7b948acabbc0eafc206827b05a3ac9b7';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
setLoading(true)
try{
const response=await fetch(url)
const data=await response.json()
const localSearch=data.results
setSearchQuery(""); 

}catch(err){console.log(err);
}
finally {
  setLoading(false); 
}
  }

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchMovies(debouncedSearchQuery);
      
    } else {
      setSearchResult([]); 
    }
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(searchQuery);

  };
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
        <div className=' text-2xl lg:text-4xl text-orange-500'>
          MovieLand
        </div>
        <div className='hidden md:block' >
          <ul className='flex text-orange-500 justify-end gap-8 me-6'>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            {isLogin === 'true' ? (
              <Link href="/">
                <button onClick={
                  handleLogout
           } className='border-2 rounded-lg border-orange-500 px-2'>
                  Logout
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className='border-2 rounded-lg border-orange-500 px-2'>
                  Sign In
                </button>
              </Link>
            )}
           
            
          </ul>
        </div>
        <div className=' cursor-pointer block md:hidden  me-6'><GiHamburgerMenu color="white" size={28} />
        </div>
      </div>

      <div className='bg-orange-500 flex justify-end items-center py-2 pe-6'>
        <div className='hidden md:block'>
          <ul className='flex text-white gap-8 me-6'>
          <li className=' cursor-pointer'  onClick={() => handleGetFavorites()}>My Favorites</li>

            <li className=' cursor-pointer' onClick={() => handleGenreClick("Action")}>Action</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Comedy")}>Comedy</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Animation")}>Animation</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("Drama")}>Drama</li>
            <li className=' cursor-pointer'  onClick={() => handleGenreClick("")}>All</li>

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
            <button   onClick={closeModal} className="px-4 py-1 border-2  bg-orange-500 text-white font-bold rounded-lg">Close</button>
            <button onClick={()=>{
              push("/login")
            }} className="px-4 py-1 border-2  bg-orange-500 text-white font-bold rounded-lg">Sign in</button>

          </div>
        </div>
      )}
    </header>

  )
}

export default Header
