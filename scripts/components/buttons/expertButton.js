export default function ExpertButton() {
  // Button
  const expertButton = document.createElement("div");
  expertButton.className = `emoji-button`;
  expertButton.innerHTML = `3️⃣`;
  if (level === "expert") {
    expertButton.classList.add("emoji-button-clicked");
  }

  // Functionality
  expertButton.addEventListener("click", () => {
    if (level !== "expert") {
      localStorage.setItem("level", "expert");
      window.location.reload();
    }
  });

  return expertButton;
}
