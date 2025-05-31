// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCCyTzjhfFizaIaMVVL7hDvROhCvzXfppQ",
  authDomain: "secretchat-a8a5e.firebaseapp.com",
  projectId: "secretchat-a8a5e",
  storageBucket: "secretchat-a8a5e.appspot.com",
  messagingSenderId: "110339353983",
  appId: "1:110339353983:web:3054747308b2e840a23e4a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
