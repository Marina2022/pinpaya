// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC21QqF1gR0Y_0K0vWq_PbIbf_bHULCiyY",
    authDomain: "chat2-5f64a.firebaseapp.com",
    projectId: "chat2-5f64a",
    storageBucket: "chat2-5f64a.appspot.com",
    messagingSenderId: "223575069811",
    appId: "1:223575069811:web:2be87dd6caeb441498c606"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
