/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

import { setDesktopLogoTheme } from '../../utils/logoUtils.js';

export default function DarkModeButton(darkMode) {
  const iconCache = new Map();
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
    setDesktopLogoTheme(isDarkMode);
    window.emojiMinesweeper?.setDarkMode(isDarkMode);
    renderButton();
  }

  function renderButton() {
    const iconPath = isDarkMode
      ? 'emoji/waning_crescent_moon_flat.png'
      : 'emoji/sun_flat.png';

    if (!iconCache.has(iconPath)) {
      const icon = document.createElement('img');
      icon.src = iconPath;
      iconCache.set(iconPath, icon);
    }

    darkModeButton.replaceChildren(iconCache.get(iconPath));
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      toggleDarkMode();
    }
  });
  return darkModeButton;
}
