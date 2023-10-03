/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function MenuLogo() {
  const menuLogo = document.createElement("img");
  menuLogo.setAttribute("id", "menu-logo");
  menuLogo.setAttribute("src", "../../assets/logo.svg");
  menuLogo.setAttribute("alt", "Emoji Minesweeper Logo");
  menuLogo.setAttribute("width", "40px");

  return menuLogo;
}
