// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyGEk1Ch9RNQRXi4po2o1AqqwOe72_XY4",
  authDomain: "goif-81ae3.firebaseapp.com",
  projectId: "goif-81ae3",
  storageBucket: "goif-81ae3.firebasestorage.app",
  messagingSenderId: "387456861999",
  appId: "1:387456861999:web:442c288d82f98124e343da",
  measurementId: "G-D7H3JZH7RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);