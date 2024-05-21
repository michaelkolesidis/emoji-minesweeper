/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * flagButton.js contains all the flag
 * button functionality, the button,
 * the utility functions and the keyboard
 * event handling.
 */

export default function FlagButton(board) {
  // Button
  const flagButton = document.createElement('div');
  flagButton.title = `Toggle flag mode`;
  flagButton.className = `emoji-button`;
  flagButton.innerHTML = `<img src="../../../emoji/triangular_flag_flat.png" />`;

  // Flag Button Functionality
  let flagMode = false;
  flagButton.addEventListener('click', () => {
    toggleFlagMode();
  });

  // Utility Function
  function toggleFlagMode() {
    if (flagMode) {
      window.localStorage.setItem('flagMode', 'false');
      flagButton.classList.remove('flag-clicked');
      board.classList.remove('flag-mode');
      flagMode = false;
    } else {
      window.localStorage.setItem('flagMode', 'true');
      flagButton.classList.add('flag-clicked');
      board.classList.add('flag-mode');
      flagMode = true;
    }
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    if (e.code === 'KeyF') {
      toggleFlagMode();
    }
  });

  return flagButton;
}
