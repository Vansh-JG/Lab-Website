// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAemXZ3m--sPkMuM89xqEas1HqXSkH1m8E",
  authDomain: "research-web-5c065.firebaseapp.com",
  projectId: "research-web-5c065",
  storageBucket: "research-web-5c065.firebasestorage.app",
  messagingSenderId: "665314002821",
  appId: "1:665314002821:web:d96e6d4a7273b60691e6ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)