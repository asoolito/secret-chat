// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  databaseURL: "https://hacker-chat-4fff2-default-rtdb.firebaseio.com/",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.appspot.com",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

// Foydalanuvchi nomi so‘raladi
let username = prompt("Foydalanuvchi ismingizni kiriting:") || "Anonymous";

// Xabarlarni olish
db.ref('messages').limitToLast(100).on('child_added', snapshot => {
  const message = snapshot.val();
  addMessageToUI(message.username, message.text);
});

// Xabar UI ga qo‘shish
function addMessageToUI(user, text) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<strong>${user}:</strong> ${text}`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Yuborish
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (text.length === 0) return;
  db.ref('messages').push({ username, text });
  msgInput.value = '';
});
