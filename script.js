const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

chatForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message === "") return;

  // Chat oynasiga xabar qo'shish
  const messageElem = document.createElement("div");
  messageElem.textContent = message;
  messageElem.className = "message";
  chatBox.appendChild(messageElem);

  // Scrollni pastga tushirish
  chatBox.scrollTop = chatBox.scrollHeight;

  // Inputni tozalash
  messageInput.value = "";
});

// Enter tugmasi bosilganda yuborish (Shift+Enter esa yangi qator)
messageInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
  }
});
