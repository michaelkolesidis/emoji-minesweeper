/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuButton from "./menuButton.js";
import LoginForm from "./loginForm.js";
import MainMenu from "./mainMenu.js";

export default function Menu() {
  /**
   * Elements
   */
  // Container
  const menuContainer = document.createElement("div");
  menuContainer.setAttribute("id", "menu-container");

  // Button
  const menuButton = MenuButton();
  menuContainer.appendChild(menuButton);

  // Menu
  let isLoggedIn = JSON.parse(window.localStorage.getItem("isLoggedIn"));
  if (isLoggedIn === null) {
    window.localStorage.setItem("isLoggedIn", "false");
  }

  const menu = isLoggedIn ? MainMenu() : LoginForm();
  menu.classList.add("modal");
  menu.setAttribute("id", "menu");

  menuContainer.appendChild(menu);

  /**
   * Functionality
   */
  let menuOpen = false;
  menuButton.addEventListener("click", () => {
    if (!menuOpen) {
      menuButton.innerHTML = `❌`;
      menu.style.opacity = 1;
      menu.style.pointerEvents = "auto";
      menu.style.zIndex = 3;
      menuOpen = true;
    } else {
      menuButton.innerHTML = `👤`;
      menu.style.opacity = 0;
      menu.style.pointerEvents = "none";
      menu.style.zIndex = 0;
      menuOpen = false;
    }
  });

  menu.addEventListener("keydown", (e) => {
    e.stopPropagation(); // to prevent shortcuts from being triggered
  });

  return menuContainer;
}
