/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function NewGameButton() {
  // Button
  const newGameButton = document.createElement('div');
  newGameButton.title = `New game`;
  newGameButton.className = `emoji-button`;
  newGameButton.innerHTML = `<img src="../../../emoji/svg/new_button_flat.svg" />`;

  // Functionality
  newGameButton.addEventListener('click', () => {
    window.location.reload();
  });

  return newGameButton;
}
