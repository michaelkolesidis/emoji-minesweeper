/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 */

export default function DarkModeButton(darkMode) {
  // Button
  const darkModeButton = document.createElement('div');
  darkModeButton.title = `Toggle dark mode`;
  darkModeButton.className = `emoji-button`;
  darkModeButton.innerHTML = darkMode
    ? `<img src="../../../emoji/waning_crescent_moon_flat.png" />`
    : `<img src="../../../emoji/sun_flat.png"/>`;

  // Theme Button Functionality
  darkModeButton.addEventListener('click', () => {
    toggleDarkMode();
  });

  function toggleDarkMode() {
    if (darkMode) {
      window.localStorage.setItem('darkMode', 'false');
    } else {
      window.localStorage.setItem('darkMode', 'true');
    }
    window.location.reload();
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      toggleDarkMode();
    }
  });
  return darkModeButton;
}
