import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Movies from "@/Components/Movies/Movies";
import { useEffect, useState } from "react";

import {motion} from 'framer-motion'
import { backgroundVariants, slideInVariants } from "@/motions";

export default function Home() {

  const [movieGenre, setMovieGenre] = useState<string>('Action');
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [userFav,setUserFav]=useState([])
  useEffect(() => {
    const savedGenre = localStorage.getItem("genre") || "";
    setMovieGenre(savedGenre);
  }, []);

  const handleGenreChange = (newGenre: string) => {
    setMovieGenre(newGenre);
    localStorage.setItem("genre", newGenre);  
  setSearchQuery("")
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    console.log("appdalki search",searchQuery);
    
  };

  // const handleGetFav=(myFav:[])=>{
  //   setUserFav(myFav)
  // }
  return (
   <div className="w-full min-h-screen flex flex-col">
    <Header  onGenreChange={handleGenreChange} onSearchChange={handleSearchChange}   />
    <motion.div   variants={backgroundVariants}
    className="flex-grow"
    initial="initial"
    whileHover="whileHover">
      
    <motion.div
    // variants={pageVariants}
    variants={ slideInVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex-grow min-h-screen">
        <Movies  search={searchQuery} genre={movieGenre}  />
      </motion.div>
          <Footer/>
    </motion.div>
  
   </div>
  );
}
