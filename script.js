
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
const messagesRef = db.ref("messages");

const messagesDiv = document.getElementById("messages");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typingDiv = document.getElementById("typing");

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
  sendTypingStatus();
});

function sendMessage() {
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();
  if (!username || !text) return alert("Ism va xabar kiriting!");

  messagesRef.push({
    username,
    text,
    timestamp: Date.now()
  });

  messageInput.value = "";
  sendTypingStatus(false);
}

function showMessage(data) {
  const div = document.createElement("div");
  div.textContent = `${data.username}: ${data.text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

let typingTimeout;
function sendTypingStatus(active = true) {
  const username = usernameInput.value.trim();
  if (!username) return;

  db.ref("typing").set(active ? `${username} yozmoqda...` : "");
  if (typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(() => {
    db.ref("typing").set("");
  }, 2000);
}

db.ref("typing").on("value", snapshot => {
  typingDiv.textContent = snapshot.val() || "";
});

messagesRef.on("child_added", snapshot => {
  showMessage(snapshot.val());
});
