// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU34TXl5V7_cLPxuMX-PBgaVtYSYM0i9A",
  authDomain: "casecobra-f29c4.firebaseapp.com",
  projectId: "casecobra-f29c4",
  storageBucket: "casecobra-f29c4.firebasestorage.app",
  messagingSenderId: "970236166985",
  appId: "1:970236166985:web:91d9e78a98f058da3b5098",
  measurementId: "G-0PS3N6E1J1",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
