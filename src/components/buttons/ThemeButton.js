/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  themeButton.js contains all the theme
 *  button functionality, the button,
 *  the utility functions and the keyboard
 *  event handling.
 */

import { renderHeaderTitle } from '../Header.js';

import { themes } from '../../themes.js';
import {
  preloadImage,
  scheduleAfterInitialRender,
} from '../../utils/assetPreloader.js';

const themeIconCache = new Map();

export default function ThemeButton(header) {
  // Button
  const themeButton = document.createElement('div');
  themeButton.title = `Change theme`;
  themeButton.setAttribute('aria-label', 'Change theme');
  themeButton.id = `theme-button`;
  themeButton.className = `emoji-button`;
  let theme = window.localStorage.getItem('theme') ?? 'mine';
  renderThemeIcon();
  preloadRemainingThemeIcons();

  // Theme Button Functionality
  themeButton.addEventListener('click', () => {
    switchTheme();
  });

  // Utility Functions for Switching Themes
  function switchTheme() {
    const themeKeys = Object.keys(themes);
    let currentThemeIndex = themeKeys.indexOf(theme);

    // Switch to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
    theme = themeKeys[currentThemeIndex];
    window.localStorage.setItem('theme', theme);

    updateTheme();
  }

  function switchThemeReverse() {
    const themeKeys = Object.keys(themes);
    let currentThemeIndex = themeKeys.indexOf(theme);

    // Switch to previous theme
    currentThemeIndex =
      (currentThemeIndex - 1 + themeKeys.length) % themeKeys.length;
    theme = themeKeys[currentThemeIndex];
    window.localStorage.setItem('theme', theme);

    updateTheme();
  }

  function updateTheme() {
    window.emojiMinesweeper?.setTheme(theme);
    window.localStorage.setItem('mainEmoji', themes[theme].mine);
    syncJapaneseTitleClass();
    renderHeaderTitle(header, themes[theme].title);
    renderThemeIcon();
  }

  function syncJapaneseTitleClass() {
    const isJapaneseTheme = theme === 'japan';
    header.classList.toggle('japanese', isJapaneseTheme);
    window.localStorage.setItem('japanese', String(isJapaneseTheme));
  }

  function renderThemeIcon() {
    themeButton.replaceChildren(getThemeIcon(themes[theme]));
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    // Switch Themes
    if (event.code === 'ArrowRight') {
      switchTheme();
    }

    if (event.code === 'ArrowLeft') {
      switchThemeReverse();
    }
  });

  return themeButton;
}

function getThemeIcon(theme) {
  if (!themeIconCache.has(theme.mine)) {
    themeIconCache.set(theme.mine, preloadImage(theme.mine));
  }

  const icon = themeIconCache.get(theme.mine);
  icon.alt = `${theme.title} theme`;
  return icon;
}

function preloadRemainingThemeIcons() {
  scheduleAfterInitialRender('theme-button-icons', () => {
    Object.values(themes).forEach(theme => {
      getThemeIcon(theme);
    });
  });
}
