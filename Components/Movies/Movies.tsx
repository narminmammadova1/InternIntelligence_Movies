
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { MovieType } from '@/interfaces/interfaces'

const Movies = () => {
  const [movies, setMovies] = useState<MovieType[]>([])
  const apiKey = "7b948acabbc0eafc206827b05a3ac9b7"

  const getMovies = async (genre: string) => {
    let url = ""

    if (genre === "Action") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&page=1`
    } else if (genre === "Comedy") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&page=1`
    } else if (genre === "Animation") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&page=1`
    } else if (genre === "Drama") {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&page=1`
    } else {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
    }

    try {
      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results)
    } catch (err) {
      console.log("Error:", err)
    }
  }

  useEffect(() => {
    const savedGenre = localStorage.getItem("genre") || "" 

    if (savedGenre) {
      getMovies(savedGenre) 
    } else {
      getMovies("") 
    }
  })

  return (
    <div className='py-6 w-full px-4'>
      <div className='grid grid-cols- sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Movies
