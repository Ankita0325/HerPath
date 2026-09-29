import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNG3si6mZK7FOOD_5iqEDaz4FeRIKyuM4",
  authDomain: "herpath-46376.firebaseapp.com",
  projectId: "herpath-46376",
  storageBucket: "herpath-46376.firebasestorage.app",
  messagingSenderId: "220185547208",
  appId: "1:220185547208:web:cc89062d30e03eb18ef0fd",
  measurementId: "G-CYBX09RN2E"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
