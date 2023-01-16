/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 * 
 */

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
