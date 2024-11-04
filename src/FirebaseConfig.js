// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLMScfPRccYS1t26bRWK0oK8MMQvufSzY",
  authDomain: "atu-academic-writing-game.firebaseapp.com",
  databaseURL: "https://atu-academic-writing-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "atu-academic-writing-game",
  storageBucket: "atu-academic-writing-game.appspot.com",
  messagingSenderId: "402594066923",
  appId: "1:402594066923:web:574827aa40b48f8dc429ae",
  measurementId: "G-6T61MMEK99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

export { db, firebaseConfig }; // If you want to use db in other files

