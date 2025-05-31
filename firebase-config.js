// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCyTzjhfFizaIaMVVL7hDvROhCvzXfppQ",
  authDomain: "secretchat-a8a5e.firebaseapp.com",
  projectId: "secretchat-a8a5e",
  storageBucket: "secretchat-a8a5e.appspot.com",
  messagingSenderId: "110339353983",
  appId: "1:110339353983:web:3054747308b2e840a23e4a",
  databaseURL: "https://secretchat-a8a5e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth, signInAnonymously };
