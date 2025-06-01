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
const usernameInput = document.getElementById('username');

// Xabar chiqarish
function addMessageToUI(username, text) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<span class="user">${username}:</span> ${text}`;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Xabarlarni real vaqtda olish
db.ref('messages').limitToLast(100).on('child_added', snapshot => {
  const data = snapshot.val();
  addMessageToUI(data.username, data.text);
});

// Xabar yuborish
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = usernameInput.value.trim() || 'Anonymous';
  const text = msgInput.value.trim();
  if (text.length === 0) return;
  db.ref('messages').push({ username, text });
  msgInput.value = '';
});
