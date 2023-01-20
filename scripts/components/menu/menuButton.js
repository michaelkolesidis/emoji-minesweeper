/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function MenuButton() {
  const menuButton = document.createElement("div");
  menuButton.classList.add("emoji-button");
  menuButton.setAttribute("id", "menu-button");
  menuButton.innerHTML = `👤`;

  return menuButton;
}
