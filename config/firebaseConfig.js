// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUhvpjLbVGegMdXo2whwVr0JsfiYefR1A",
  authDomain: "dinebook-712a8.firebaseapp.com",
  projectId: "dinebook-712a8",
  storageBucket: "dinebook-712a8.firebasestorage.app",
  messagingSenderId: "699404539732",
  appId: "1:699404539732:web:80e9ac70074964cbca5ac1",
  measurementId: "G-532VZ6FSLR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
