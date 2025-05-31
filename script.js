document.getElementById('chat-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('message-input');
  const message = input.value.trim();
  if (message) {
    await db.collection('messages').add({
      text: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    input.value = '';
  }
});

db.collection('messages').orderBy('timestamp')
  .onSnapshot(snapshot => {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    snapshot.forEach(doc => {
      const msg = document.createElement('div');
      msg.textContent = '> ' + doc.data().text;
      chatBox.appendChild(msg);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
