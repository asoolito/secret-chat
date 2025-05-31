let username = "";

function enterChat() {
  const nicknameInput = document.getElementById("nickname");
  if (nicknameInput.value.trim() === "") {
    alert("Nickname kiriting!");
    return;
  }

  username = nicknameInput.value.trim();
  document.getElementById("user-label").textContent = "👤 Siz: " + username;
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("chat-screen").classList.remove("hidden");
}

const form = document.getElementById("chat-form");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("message-input");
  const message = input.value.trim();
  if (message === "") return;

  const p = document.createElement("p");
  p.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(p);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
});
