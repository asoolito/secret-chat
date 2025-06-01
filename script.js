// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyByz_qsV-EcBgnbAbOIRvD9SQD06NcWzyM",
  authDomain: "hacker-chat-4fff2.firebaseapp.com",
  databaseURL: "https://hacker-chat-4fff2-default-rtdb.firebaseio.com",
  projectId: "hacker-chat-4fff2",
  storageBucket: "hacker-chat-4fff2.appspot.com",
  messagingSenderId: "426796888186",
  appId: "1:426796888186:web:f830147b355ceb0cae8bc3"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const messagesEl = document.getElementById('messages');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

db.ref('messages').limitToLast(100).on('child_added', snapshot => {
  const message = snapshot.val();
  addMessageToUI(message.username + ": " + message.text);
});

function addMessageToUI(text) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;

  // Foydalanuvchi ismini olish (masalan, prompt orqali)
  let username = localStorage.getItem('username');
  if (!username) {
    username = prompt("Ismingizni kiriting:");
    if (!username) username = "Anonymous";
    localStorage.setItem('username', username);
  }

  db.ref('messages').push({ username, text });
  msgInput.value = '';
});
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
