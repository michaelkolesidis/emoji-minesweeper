/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuButton from "./menuButton.js";
import LoginForm from "./loginForm.js";
import MainMenu from "./mainMenu.js";
import ComingSoon from "./comingSoon.js";

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

  let menu;
  // menu = isLoggedIn ? MainMenu() : LoginForm();
  menu = ComingSoon();
  menu.classList.add("modal");
  menu.setAttribute("id", "menu");

  menuContainer.appendChild(menu);

  /**
   * Functionality
   */
  menu.addEventListener("keydown", (e) => {
    e.stopPropagation(); // to prevent shortcuts from being triggered
  });

  return menuContainer;
}
