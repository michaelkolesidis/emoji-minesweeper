/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function LogoutButton() {
  // Button
  const logoutButton = document.createElement("button");
  logoutButton.innerText = `Logout`;

  // Functionality
  logoutButton.addEventListener("click", () => {
    window.localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  });

  return logoutButton;
}
