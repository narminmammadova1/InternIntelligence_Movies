
export interface MovieType{
    id:number | undefined;
    title:string;
    release_date:string;
    poster_path:string;
    overview:string;
    genres:any[];
    original_language?:string
  
  }