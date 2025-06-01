// Firebase config - o'zingizning configni shu yerga qo'ying
const firebaseConfig = {
  apiKey: "SIZNING_API_KEY",
  authDomain: "SIZNING_AUTH_DOMAIN",
  databaseURL: "https://hacker-chat-4fff2-default-rtdb.firebaseio.com/",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.appspot.com",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};

// Firebase boshlash
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

// Xabarlarni olish va real vaqtda ko'rsatish
db.ref('messages').limitToLast(100).on('child_added', snapshot => {
  const message = snapshot.val();
  addMessageToUI(message.text);
});

// UI ga xabar qo'shish funksiyasi
function addMessageToUI(text) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Xabar yuborish
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (text.length === 0) return;
  db.ref('messages').push({ text });
  msgInput.value = '';
});
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
