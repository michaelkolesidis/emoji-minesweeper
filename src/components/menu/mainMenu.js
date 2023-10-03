/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuLogo from "./menuLogo.js";
import LogoutButton from "./logoutButton.js";

export default function MainMenu() {
  const mainMenu = document.createElement("div");

  // Logo
  const menuLogo = MenuLogo();
  mainMenu.appendChild(menuLogo);

  const logoutButton = LogoutButton();
  mainMenu.appendChild(logoutButton);

  return mainMenu;
}
