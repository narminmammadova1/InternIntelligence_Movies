
import React  from 'react';
import { useQuery } from 'react-query';
import Card from '../Card/Card';
import {  MovieType } from '@/interfaces/interfaces';


export const fetchMovies = async (genre: string, search:string) => {
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


const Movies: React.FC<{ genre: string, search:string}> = ({ genre ,search }) => {

  const { data: movies, isLoading, isError, error } = useQuery<MovieType[]>(
    ['movies', genre,search],
    () => fetchMovies(genre,search),
     );

  if (isError && error instanceof Error) return <div>Error: {error.message}</div>;
 
console.log("mooooovies",movies);

if (!movies || isLoading) return<div className="flex w-full h-screen justify-center items-center">
<div className=" w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full   animate-spin"></div>
</div>
  return (
    <div className="py-6 w-full md:px-0 px-2 flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 text-center md:grid-cols-4 lg:grid-cols-4 gap-10">
      
    {movies?.map((movie:MovieType ) => (

<Card key={movie.id} movie={movie} />
))}
      </div>
    </div>
  );
};

export default Movies;
