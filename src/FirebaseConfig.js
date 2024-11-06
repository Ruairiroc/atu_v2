// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt2Rikcx-a8wk_zSHAnga-LmpN50sSDSs",
  authDomain: "atuproj-71480.firebaseapp.com",
  projectId: "atuproj-71480",
  storageBucket: "atuproj-71480.firebasestorage.app",
  messagingSenderId: "583015056970",
  appId: "1:583015056970:web:268c8851245a730b8788b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);


