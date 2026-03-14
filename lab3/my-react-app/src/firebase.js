import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB7V7vx5S3Gp0RWzEbphNMjJje-0gYD3ec",
  authDomain: "fooddelivery-dcdcd.firebaseapp.com",
  projectId: "fooddelivery-dcdcd",
  storageBucket: "fooddelivery-dcdcd.firebasestorage.app",
  messagingSenderId: "136086341507",
  appId: "1:136086341507:web:bd98875829b2bd3412d8b6",
  measurementId: "G-0K5N54432S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);