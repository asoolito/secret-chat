// Firebase configni o'zgaruvchilar bilan o'zgartiring
const adminUsername = "Admin"; // Admin username

// DOM elementlarni olish
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");
const chatContainer = document.getElementById("chat-container");

let currentUser = null;

// Firebase imports va inits
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  // Sizning Firebase config ma'lumotlaringiz
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messagesRef = collection(db, "messages");

// Login form submit bo‘lganda
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (username.length < 3) {
    alert("Username kamida 3 ta belgidan iborat bo'lishi kerak!");
    return;
  }
  currentUser = username;
  loginForm.style.display = "none";
  chatContainer.style.display = "block";
});

// Chat form submit bo‘lganda (Send tugmasi bosilganda)
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  // Xabarni Firebase ga qo'shish
  await addDoc(messagesRef, {
    username: currentUser,
    message: message,
    timestamp: serverTimestamp(),
  });

  messageInput.value = "";
});

// Enter bosilganda yuborish, Shift+Enter yangi qatorda yozish
messageInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});

// Chatni real vaqtda ko‘rsatish
const q = query(messagesRef, orderBy("timestamp", "asc"));
onSnapshot(q, (querySnapshot) => {
  chatBox.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const messageElem = document.createElement("div");
    messageElem.classList.add("message");
    if (data.username === currentUser) messageElem.classList.add("my-message");
    if (data.username === adminUsername) messageElem.classList.add("admin-message");

    messageElem.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
