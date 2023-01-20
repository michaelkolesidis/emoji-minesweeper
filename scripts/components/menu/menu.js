/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuLogo from "./menuLogo.js";
import LogoutButton from "./logoutButton.js";

export default function Menu() {
  const menu = document.createElement("div");

  // Logo
  const menuLogo = MenuLogo();
  menu.appendChild(menuLogo);

  const logoutButton = LogoutButton();
  menu.appendChild(logoutButton);

  return menu;
}
