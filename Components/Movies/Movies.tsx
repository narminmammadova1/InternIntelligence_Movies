
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Card from '../Card/Card';
import {db,ref,get,auth} from "../../firebase"

const fetchMovies = async (genre: string, search:string) => {
  const apiKey = "7b948acabbc0eafc206827b05a3ac9b7";
  let url = "";
  if (search) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=1`;
  } 
  else{
     if (genre === "Action") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&page=1`;
    } else if (genre === "Comedy") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&page=1`;
    } else if (genre === "Animation") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&page=1`;
    } else if (genre === "Drama") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&page=1`;
    } 
    else if(genre==="") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`;
    }
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};


const fetchFavorites=async(userId:string)=>{
  const favoriteMovies=ref(db,"favorites/"+userId)
const snapshot=await get(favoriteMovies)
if(snapshot.exists()){
  return snapshot.val()
}else{
  return[]
}
}

const Movies: React.FC<{ genre: string, search:string }> = ({ genre ,search }) => {

const [userId,setUserId]=useState<string | null>(null)
const [favoriteMovies,setFavoriteMovies]=useState([])
useEffect(() => {
  const user = auth.currentUser; 
  console.log("userrr",user?.uid);
  if (user) {
    setUserId(user?.uid); 
  }
}, []);

useEffect(() => {
  if (userId) {
    fetchFavorites(userId).then((movies) => {
      setFavoriteMovies(movies); 
    });
  }
}, [userId]);
  const { data: movies, isLoading, isError, error } = useQuery(
    ['movies', genre,search],
    () => fetchMovies(genre,search),
     );

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError && error instanceof Error) return <div>Hata: {error.message}</div>;


  if (favoriteMovies.length > 0) {
    return (
      <div className="py-6 w-full md:px-0 px-4 flex justify-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 text-center md:grid-cols-4 lg:grid-cols-4 gap-10">
          {favoriteMovies?.map((movie:any) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="py-6 w-full md:px-0 px-4 flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 text-center md:grid-cols-4 lg:grid-cols-4 gap-10">
        {movies?.map((movie:any) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
