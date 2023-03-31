// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCui9wZsrV4ZuZHFtkOibkwRl8tq1Qom1U",
  authDomain: "fir-practice-c5fcf.firebaseapp.com",
  projectId: "fir-practice-c5fcf",
  storageBucket: "fir-practice-c5fcf.appspot.com",
  messagingSenderId: "372972251466",
  appId: "1:372972251466:web:385da889bfb82b34a339b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();