// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjQGOvWJwVnec9OTPp4ORckHwXzFiXWD0",
  authDomain: "ai-trip-planner-906a6.firebaseapp.com",
  projectId: "ai-trip-planner-906a6",
  storageBucket: "ai-trip-planner-906a6.firebasestorage.app",
  messagingSenderId: "785201145005",
  appId: "1:785201145005:web:4abb87eaeba8d1cce39224",
  measurementId: "G-V34PNXNZ4T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; 
