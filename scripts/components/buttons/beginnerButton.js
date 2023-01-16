/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 * 
 */
  
export default function BeginnerButton() {
  // Button
  const beginnerButton = document.createElement("div");
  beginnerButton.className = `emoji-button`;
  beginnerButton.innerHTML = `1️⃣`;
  if (level === "beginner") {
    beginnerButton.classList.add("emoji-button-clicked");
  }

  // Functionality
  beginnerButton.addEventListener("click", () => {
    if (level !== "beginner") {
      localStorage.setItem("level", "beginner");
      window.location.reload();
    }
  });

  return beginnerButton;
}
