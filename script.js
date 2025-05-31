let currentUser = "";

document.getElementById("login-btn").addEventListener("click", () => {
  const usernameInput = document.getElementById("username").value.trim();
  if (usernameInput) {
    currentUser = usernameInput;
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "flex";
  }
});

document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message-input").value.trim();
  if (message) {
    await db.collection("messages").add({
      username: currentUser,
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("message-input").value = "";
  }
});

db.collection("messages").orderBy("timestamp")
  .onSnapshot(snapshot => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.textContent = `[${msg.username}]: ${msg.text}`;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
