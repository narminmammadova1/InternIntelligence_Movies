import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBQ5jmWfThcHa2CJIm5PnwOmjq1_WNsNZ4",
  authDomain: "movieland-f598f.firebaseapp.com",
  projectId: "movieland-f598f",
  storageBucket: "movieland-f598f.firebasestorage.app",
  messagingSenderId: "7768867120",
  appId: "1:7768867120:web:8cb016a1c4a73dbdcc48f5",
  measurementId: "G-GVJZ0P79WL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const currentUser=auth.currentUser

export { auth, firestore, createUserWithEmailAndPassword,currentUser,db,ref,get};
