// Firebase JS SDK importlari va konfiguratsiyasi
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "SENING_API_KEY",
  authDomain: "SENING_PROJECT.firebaseapp.com",
  projectId: "SENING_PROJECT",
  storageBucket: "SENING_PROJECT.appspot.com",
  messagingSenderId: "SENING_MESSAGING_SENDER_ID",
  appId: "SENING_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
};
