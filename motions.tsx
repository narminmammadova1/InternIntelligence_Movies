import { motion } from 'framer-motion';
export const cardVariants = {
   
    initial: { opacity: 1, scale: 1, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.3)" },
    whileHover: {
      opacity: 1,
      scale: 1.05,
      boxShadow: "10px 8px 15px rgba(145, 78, 15, 0.6)", 
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };



  export const liVariants = {
   
    initial: { opacity: 1, scale:1, boxShadow: "0px 0px 0px rgba(20, 18, 18, 0.3)" },
    whileHover: {
      opacity: 1,
      scale: 1.1,
      color: "#871010",
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  };

  export const pageVariants={
    initial:{opacity:0,scale:0.9},
    animate:{opacity:1,scale:1,transition:{duration:0.5}},
    exit:{opacity:0,scale:0.9,transition:{duration:0.5}}
  }

  export const slideInVariants = {
    initial: { y: '100vh' }, 
    animate: { y: 0, transition: { duration: 1 } },
    exit: { y: '100vh', transition: { duration: 0.8 } },
  };


  export const backgroundVariants = {
    initial: { background: "linear-gradient(45deg, #FF5722, #1f1b29)" },
    whileHover: {
      background: "linear-gradient(45deg, #1c3d29, #0d0921)",

      transition: { duration: 1 }
    }
  };

  export const sidebarVariants = {
    initial: { x: '100vw' }, // Sağdan dışarıda
    animate: { x: 0, transition: { duration: 0.1 } }, // Giriş yapacak
    exit: { x: '100vw', transition: { duration: 0.5 } }, // Sağdan çıkacak
  };