/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function NewGameButton() {
  // Button
  const newGameButton = document.createElement("button");
  newGameButton.setAttribute("id", "new-game-button");
  newGameButton.innerHTML = `New Game`;

  // Functionality
  newGameButton.addEventListener("click", () => {
    window.location.reload();
  });

  return newGameButton;
}
