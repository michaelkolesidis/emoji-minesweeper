/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

import { setDesktopLogoTheme } from '../../utils/logoUtils.js';
import {
  preloadImage,
  scheduleAfterInitialRender,
} from '../../utils/assetPreloader.js';

const darkModeIconSources = {
  light: { src: 'emoji/sun_flat.png', alt: 'Light mode' },
  dark: { src: 'emoji/waning_crescent_moon_flat.png', alt: 'Dark mode' },
};
const darkModeIcons = new Map();

export default function DarkModeButton(darkMode) {
  let isDarkMode = darkMode;

  // Button
  const darkModeButton = document.createElement('div');
  darkModeButton.title = `Toggle dark mode`;
  darkModeButton.setAttribute('aria-label', 'Toggle dark mode');
  darkModeButton.className = `emoji-button`;
  renderButton();
  preloadRemainingDarkModeIcons();

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
    darkModeButton.replaceChildren(
      getDarkModeIcon(isDarkMode ? 'dark' : 'light')
    );
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    if (event.code === 'KeyD') {
      toggleDarkMode();
    }
  });
  return darkModeButton;
}

function getDarkModeIcon(mode) {
  if (!darkModeIcons.has(mode)) {
    const { src, alt } = darkModeIconSources[mode];
    darkModeIcons.set(mode, preloadImage(src, alt));
  }

  return darkModeIcons.get(mode);
}

function preloadRemainingDarkModeIcons() {
  scheduleAfterInitialRender('dark-mode-button-icons', () => {
    Object.keys(darkModeIconSources).forEach(getDarkModeIcon);
  });
}
