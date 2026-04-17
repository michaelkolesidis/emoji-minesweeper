/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

export default function NewGameButton() {
  // Button
  const newGameButton = document.createElement('div');
  newGameButton.title = `New game (N)`;
  newGameButton.className = `emoji-button`;
  newGameButton.innerHTML = `<img src="emoji/svg/new_button_flat.svg" />`;
  // The click functionality is  handled in main.js
  return newGameButton;
}
