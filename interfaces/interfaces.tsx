
export interface MovieType{
    id:number 
    title:string;
    release_date:string 
    poster_path?:string;
    overview?:string;
    genres?:any[];
    original_language?:string
  
  }
  
  export interface FavoriteType{
    id:number,
    title:string,
    // imageUrl:string
    poster_path:string,
    release_date:string

  }