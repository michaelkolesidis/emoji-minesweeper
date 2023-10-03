/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function MenuButton() {
  // Element
  const menuButton = document.createElement("div");
  menuButton.classList.add("emoji-button");
  menuButton.setAttribute("id", "menu-button");

  const accountEmoji = document.createElement("span");
  accountEmoji.classList.add("menu-button-content");
  accountEmoji.innerHTML = `👤`;
  menuButton.appendChild(accountEmoji);

  const crossEmoji = document.createElement("span");
  crossEmoji.classList.add("menu-button-content");
  crossEmoji.style.opacity = 0;
  crossEmoji.innerHTML = `❌`;
  menuButton.appendChild(crossEmoji);

  // Functionality
  let menuOpen = false;
  menuButton.addEventListener("click", () => {
    if (!menuOpen) {
      crossEmoji.style.opacity = 1;
      accountEmoji.style.opacity = 0;
      menu.style.opacity = 1;
      menu.style.pointerEvents = "auto";
      menu.style.zIndex = 3;
      menuOpen = true;
    } else {
      crossEmoji.style.opacity = 0;
      accountEmoji.style.opacity = 1;
      menu.style.opacity = 0;
      menu.style.pointerEvents = "none";
      menu.style.zIndex = 0;
      menuOpen = false;
    }
  });

  return menuButton;
}
