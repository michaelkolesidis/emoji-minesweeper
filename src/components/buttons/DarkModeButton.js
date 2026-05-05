/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function DarkModeButton(darkMode) {
  let isDarkMode = darkMode;

  // Button
  const darkModeButton = document.createElement('div');
  darkModeButton.title = `Toggle dark mode`;
  darkModeButton.className = `emoji-button`;
  renderButton();

  // Theme Button Functionality
  darkModeButton.addEventListener('click', () => {
    toggleDarkMode();
  });

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    window.localStorage.setItem('darkMode', String(isDarkMode));
    document.body.classList.toggle('dark-mode', isDarkMode);
    window.emojiMinesweeper?.setDarkMode(isDarkMode);
    renderButton();
  }

  function renderButton() {
    darkModeButton.innerHTML = isDarkMode
      ? `<img src="emoji/waning_crescent_moon_flat.png" />`
      : `<img src="emoji/sun_flat.png"/>`;
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      toggleDarkMode();
    }
  });
  return darkModeButton;
}
