// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.x/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.x/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.x/firebase-firestore.js";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAdIRdEEvsdyob6G-Fg6fhAeaCmVCJ_1s",
  authDomain: "swe-b1034.firebaseapp.com",
  projectId: "swe-b1034",
  storageBucket: "swe-b1034.firebasestorage.app",
  messagingSenderId: "210346329221",
  appId: "1:210346329221:web:fb481a412c2d93605355ec",
  measurementId: "G-3LWDZWWEQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

