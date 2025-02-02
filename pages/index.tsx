import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Movies from "@/Components/Movies/Movies";


export default function Home() {
  return (
   <div className="w-full min-h-screen flex flex-col">
    <Header/>
    <div className="flex-grow">
        <Movies />
      </div>    <Footer/>
   </div>
  );
}
