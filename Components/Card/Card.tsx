
import { MovieType } from '@/interfaces/interfaces';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firestore,auth } from "../../firebase"; 
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const Card = ({ movie }: { movie: MovieType }) => {
  const [isFav, setIsFav] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null); 
  const [isLogged,setIsLogged]=useState(false)
  const router = useRouter();
  const { push } = router;

  // useEffect(() => {
    
  //  const localUser=localStorage.getItem("loggedUser")
  // //  setIsLogged(localUser)
   
  // }, []);


  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '';
  const movieYear = movie.release_date;

  const toggleClick = () => {
    if (!currentUser) return; 

    setIsFav((prevState) => {
      const newState = !prevState;

      if (newState) {
        addFavorites(movie.id, movie.title, imageUrl);
      } else {
        removeFromFavorites(movie.id);
      }

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
// for unmount
    return () => unsubscribe();
  }, []);



  const addFavorites = async (movieId: number, movieName: string, movieImg: string) => {
    if (currentUser) {
      const userRef = doc(firestore, "users", currentUser.uid, "favorites", movieId.toString());
      await setDoc(userRef, {
        name: movieName,
        imageUrl: movieImg,
        timestamp: new Date(),
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
    <div className="pb-2 text-white border-white w-[180px] h-[320px] md:w-[200px] md:h-[350px] lg:w-[250px] lg:h-[420px] border-dotted border-2">
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
           className="w-[20px] h-[20px] absolute top-0 right-4">
            {isFav ? <FaHeart size={32} color="red" /> : <FaRegHeart size={32} />}
          </button>
          <div className="relative justify-center gap-4">
            <p>{movieYear}</p>
            <button
              onClick={() => {
                push(`/details?id=${movie.id}`);
              }}
              className="italic absolute text-orange-500  bottom-0 right-0"
            >
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
