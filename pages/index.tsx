import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Movies from "@/Components/Movies/Movies";
import { useEffect, useState } from "react";


export default function Home() {

  const [movieGenre, setMovieGenre] = useState<string>('Action');
  const [searchQuery, setSearchQuery] = useState<string>('');
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
  return (
   <div className="w-full min-h-screen flex flex-col">
    <Header  onGenreChange={handleGenreChange} onSearchChange={handleSearchChange}  />
    <div className="flex-grow">
        <Movies  search={searchQuery} genre={movieGenre}  />
      </div>    <Footer/>
   </div>
  );
}
