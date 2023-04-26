// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN6an6uwoDYLDt3u4_pFlSfrRQ-nF1ujk",
  authDomain: "react-netflix-clone-ea5e3.firebaseapp.com",
  projectId: "react-netflix-clone-ea5e3",
  storageBucket: "react-netflix-clone-ea5e3.appspot.com",
  messagingSenderId: "169615526811",
  appId: "1:169615526811:web:a25ba9bc2681b66a7d2f3e",
  measurementId: "G-9K061W23XP"
};

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app); 