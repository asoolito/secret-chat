// Firebase importlar va konfiguratsiyani o'zing kiritganingni hisoblayman

const auth = firebase.auth();
const db = firebase.firestore();

const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const chatContainer = document.getElementById('chat-container');
const messagesList = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');

let currentUser = null;

function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function(match) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[match];
  });
}

function showMessage(data) {
  const li = document.createElement('li');
  const time = data.createdAt ? data.createdAt.toDate().toLocaleTimeString() : '';
  li.textContent = `[${time}] ${escapeHTML(data.username)}: ${escapeHTML(data.text)}`;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === '') return;

  db.collection('messages').add({
    username: currentUser,
    text: text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    messageInput.value = '';
  }).catch(console.error);
}

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user.displayName || user.email || 'Anon';
    loginForm.style.display = 'none';
    chatContainer.style.display = 'block';

    // Xabarlarni real vaqtda olish
    db.collection('messages')
      .orderBy('createdAt')
      .limit(100)
      .onSnapshot(snapshot => {
        messagesList.innerHTML = '';
        snapshot.forEach(doc => showMessage(doc.data()));
      });
  } else {
    currentUser = null;
    loginForm.style.display = 'block';
    chatContainer.style.display = 'none';
    messagesList.innerHTML = '';
  }
});

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return alert('Username kirit!');
  auth.signInAnonymously()
    .then(() => {
      // Foydalanuvchi username-ni displayName ga qo'yish uchun update qilish
      const user = auth.currentUser;
      return user.updateProfile({ displayName: username });
    })
    .catch(console.error);
});

sendBtn.addEventListener('click', () => {
  sendMessage();
});

messageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

logoutBtn.addEventListener('click', () => {
  auth.signOut();
});
