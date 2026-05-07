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

export default function ThemeButton(header) {
  const themeIconCache = new Map();

  // Button
  const themeButton = document.createElement('div');
  themeButton.title = `Change theme`;
  themeButton.id = `theme-button`;
  themeButton.className = `emoji-button`;
  let theme = window.localStorage.getItem('theme') ?? 'mine';
  renderThemeIcon();

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

    // Handle Japanese theme
    if (theme === 'japan') {
      header.classList.add('japanese');
      window.localStorage.setItem('japanese', 'true');
    } else if (theme === 'mine') {
      header.classList.remove('japanese');
      window.localStorage.setItem('japanese', 'false');
    }

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

    // Handle Japanese theme
    if (theme === 'japan') {
      header.classList.add('japanese');
      window.localStorage.setItem('japanese', 'true');
    } else if (theme === 'surf') {
      header.classList.remove('japanese');
      window.localStorage.setItem('japanese', 'false');
    }

    updateTheme();
  }

  function updateTheme() {
    window.emojiMinesweeper?.setTheme(theme);
    window.localStorage.setItem('mainEmoji', themes[theme].mine);
    header.innerHTML = themes[theme].title;
    renderThemeIcon();
  }

  function renderThemeIcon() {
    const iconPath = themes[theme].mine;

    if (!themeIconCache.has(iconPath)) {
      const icon = document.createElement('img');
      icon.src = iconPath;
      themeIconCache.set(iconPath, icon);
    }

    themeButton.replaceChildren(themeIconCache.get(iconPath));
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
