
import { MovieType } from '@/interfaces/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore,auth } from "../../firebase"; 
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

import {motion} from 'framer-motion'
import { cardVariants } from '@/motions';

const Card = ({ movie }: { movie: MovieType } ) => {
  const [isFav, setIsFav] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); 
  const [isLogged,setIsLogged]=useState(false)
  const router = useRouter();
  const { push } = router;
  const [flash, setFlash] = useState(false);


  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';
const movieYear = movie.release_date ?? "unknown"
  const toggleClick = () => {
    if (!currentUser) return; 

    setIsFav((prevState) => {
      const newState = !prevState;

      if (newState) {
        addFavorites(movie.id, movie.title, imageUrl,movie?.release_date);
      } else {
        removeFromFavorites(movie.id);
      }
      setFlash(true);
      setTimeout(() => setFlash(false), 300)
      return newState;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); 
        setIsLogged(true)
        console.log('user logged', user);
        localStorage.setItem("loggedUser","true")
      } else {
        setCurrentUser(null); 
        setIsLogged(false)
        console.log('user logout');
        localStorage.removeItem("loggedUser")
      }
    });

    return () => unsubscribe();
  }, []);



  const addFavorites = async (movieId: number| string , movieName: string, movieImg:string, movieYear:string) => {
    if (currentUser) {
      const userRef = doc(firestore, "users", currentUser.uid, "favorites", movieId.toString());
      await setDoc(userRef, {
      title: movieName,
        poster_path: movieImg,
        release_date:movieYear
      });
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    if (currentUser) {
      const userRef = doc(firestore, "users", currentUser.uid, "favorites", movieId.toString());
      await deleteDoc(userRef);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (currentUser) {
        const userRef = doc(firestore, 'users', currentUser.uid, 'favorites', movie.id.toString());
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setIsFav(true); 
        } else {
          setIsFav(false);
        }
      }
      else {
        setIsFav(false); 
      }
    };
    checkIfFavorite();
  }, [movie.id, currentUser]);

  return (
    <motion.div 
    variants={cardVariants}
    initial="initial"
    whileHover="whileHover"
   
    className="pb-2 text-white border-white w-[180px] h-[320px] md:w-[200px] md:h-[350px] lg:w-[250px] lg:h-[420px] border-dotted border-2">
      <div className="relative rounded-md">
        <Image
          className="object-cover"
          src={imageUrl}
          width={500}
          height={750}
          alt="movie"
        />
        <div className="border-t-2 text-center">
          <h1 className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
            {movie.title}
          </h1>
          <button 
          disabled={!isLogged}  
          onClick={toggleClick}
          className={` w-8 h-8 rounded-full bg-opacity-0   absolute top-2  right-6 bg-stone-300   ${flash ? 'flash' : ''}`}  
>
            {isFav ? <FaHeart className=' z-20 absolute top-0 right-0 ' size={32} color="red" /> : <FaRegHeart size={32} />}
          </button>
          <div className="relative justify-center gap-4">
            <p>{movieYear}</p>
            <button
              onClick={() => {
                push(`/details?id=${movie.id}`);
              }}
              className="italic absolute text-orange-500  bottom-1 right-2"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
