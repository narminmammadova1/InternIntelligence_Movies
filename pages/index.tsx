import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Movies from "@/Components/Movies/Movies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
