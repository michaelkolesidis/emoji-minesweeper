/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function menuContainer() {
  /**
   * Elements
   */
  // Container
  const menuContainer = document.createElement("div");
  menuContainer.setAttribute("id", "menu-container");

  // Button
  const menuButton = document.createElement("div");
  menuButton.classList.add("emoji-button");
  menuButton.setAttribute("id", "menu-button");
  menuButton.innerHTML = `👤`;
  menuContainer.appendChild(menuButton);

  // Menu
  const menu = document.createElement("div");
  menu.classList.add("modal");
  menu.setAttribute("id", "menu");
  menu.innerHTML += `<h3>Menu</h3>`;
  menu.innerHTML += `<a>Login</a>`;
  menu.innerHTML += `<a>Register</a>`;
  menu.innerHTML += `<a>Rankings</a>`;
  menu.innerHTML += `<a>Account</a>`;
  menuContainer.appendChild(menu);

  /**
   * Functionality
   */
  let menuOpen = false;
  menuButton.addEventListener("click", () => {
    if (!menuOpen) {
      menuButton.classList.add("emoji-button-clicked");
      menu.style.opacity = 1;
      menuOpen = true;
    } else {
      menuButton.classList.remove("emoji-button-clicked");
      menu.style.opacity = 0;
      menuOpen = false;
    }
  });

  return menuContainer;
}
