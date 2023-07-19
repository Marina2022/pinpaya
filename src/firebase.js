// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAK1HoNi9Pyo1SHby28s-bo3xWhsUuKaV4",
    authDomain: "pinpaya-v2.firebaseapp.com",
    projectId: "pinpaya-v2",
    storageBucket: "pinpaya-v2.appspot.com",
    messagingSenderId: "48489615476",
    appId: "1:48489615476:web:267b83d74059c5dbe10121"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
