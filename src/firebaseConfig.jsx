// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvDXgp-Xa9o9o-DZcbLqVd_0i2liS2REk",
  authDomain: "language-learning-app-5feb3.firebaseapp.com",
  projectId: "language-learning-app-5feb3",
  storageBucket: "language-learning-app-5feb3.firebasestorage.app",
  messagingSenderId: "302455722084",
  appId: "1:302455722084:web:8039cd369b737dec724f71",
  measurementId: "G-NGNRC2BFHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, addDoc, collection };