import { addDoc, onSnapshot, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

let username = null;

// DOM elements
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');

// Admin username for moderation (o'zingiz tanlaysiz)
const adminUsername = "admin_hacker";

// Kirish funksiyasi
loginBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (name.length < 3) {
    alert("Username kamida 3 ta belgidan iborat bo‘lishi kerak!");
    return;
  }
  username = name;
  loginScreen.classList.remove('active');
  chatScreen.classList.add('active');
  listenMessages();
});

// Enter bilan ham kirish
usernameInput.addEventListener('keydown', e => {
  if(e.key === 'Enter') {
    loginBtn.click();
  }
});

// Chatdagi xabarlarni tinglash va ko‘rsatish
function listenMessages() {
  const q = query(messagesCollection, orderBy('createdAt', 'asc'));
  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const msgEl = document.createElement('div');
      msgEl.classList.add('message');
      const userSpan = document.createElement('span');
      userSpan.classList.add('username');
      userSpan.textContent = data.username + ": ";
      const textSpan = document.createElement('span');
      textSpan.classList.add('text');
      textSpan.textContent = data.text;
      msgEl.appendChild(userSpan);
      msgEl.appendChild(textSpan);
      chatBox.appendChild(msgEl);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// Xabar yuborish funksiyasi
chatForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;

  try {
    await addDoc(messagesCollection, {
      username,
      text,
      createdAt: serverTimestamp()
    });
    messageInput.value = '';
  } catch(err) {
    alert("Xabar yuborishda xatolik yuz berdi!");
    console.error(err);
  }
});

// Enter + Shift qo‘shilishi
messageInput.addEventListener('keydown', e => {
  if(e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
  }
});
