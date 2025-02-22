
import { FavoriteType } from '@/interfaces/interfaces';
import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';
import Card from '@/Components/Card/Card';
import Link from 'next/link';
import { FaRegSadCry } from 'react-icons/fa';

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  const fetchFavorites = useCallback(async (userId: string) => {
    if (userId) {
      const favoritesRef = collection(firestore, 'users', userId, 'favorites');
      const snapshot = await getDocs(favoritesRef);

      // const favoriteMoviesList = snapshot.docs.map(doc => ({
      //   id: doc.id,
      
      //   ...doc.data(),
      // }));
      
      const favoriteMoviesList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id:Number(doc.id),
          title: data.title ,
          release_date:data.release_date,
          poster_path: data.poster_path          
        };
      });
      setFavoriteMovies(favoriteMoviesList);
      setLoading(false);  
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid); 
      } else {
        setUserId(null); 
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      setLoading(true); 
      fetchFavorites(userId);
    }
  }, [userId, fetchFavorites]);

  return (
    <div>
      <header className="p-4">
        <Link href="/">
          <button className="text-orange-500">Home</button>
        </Link>
      </header>
      <h1 className="text-4xl text-orange-500 text-center mb-6">My favorites</h1>
      <div>
        {loading ? ( 
          <div className="flex text-center justify-center h-screen w-full">
            <div className="justify-center flex-col items-center mt-16">
              <div className="flex justify-center">
              </div>
              <div className=" w-20 h-20 border-t-4 border-orange-500 border-solid rounded-full   animate-spin"></div>
              </div>
          </div>
        ) : favoriteMovies.length <= 0 ? (
          <div className="flex text-center justify-center h-screen w-full">
            <div className="justify-center flex-col items-center mt-16">
              <div className="flex justify-center">
                <FaRegSadCry size={96} color="#eb840fb8" className="text-5xl text-gray-400" />
              </div>
              <h1 className="text-orange-500 text-2xl italic">Add your favorite films here</h1>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4">
            {favoriteMovies.map((movie: FavoriteType) => (
              <div key={movie.id} className="flex justify-start">
                <Card movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

