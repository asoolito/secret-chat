import { db, auth, signInAnonymously } from './firebase-config.js';
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

let username = "User" + Math.floor(Math.random() * 1000);
const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

signInAnonymously(auth)
  .then(() => {
    document.getElementById('username-display').innerText = `👤 Siz: ${username}`;
  })
  .catch((error) => {
    console.error("Authentication failed:", error);
  });

form.addEventListener('submit', e => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;

  push(ref(db, 'messages'), {
    name: username,
    message: msg,
    time: Date.now()
  });

  input.value = '';
});

const messagesRef = ref(db, 'messages');
onChildAdded(messagesRef, (snapshot) => {
  const msg = snapshot.val();
  const div = document.createElement('div');
  div.textContent = `${msg.name}: ${msg.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
