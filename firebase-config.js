// BU YERGA O'ZINGIZNING FIREBASE MA'LUMOTLARINGIZNI QO'YASIZ
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase’ni ishga tushurish
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
