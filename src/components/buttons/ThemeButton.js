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
  // Button
  const themeButton = document.createElement('div');
  themeButton.title = `Change theme`;
  themeButton.id = `theme-button`;
  themeButton.className = `emoji-button`;
  let theme = window.localStorage.getItem('theme') ?? 'mine';
  themeButton.innerHTML = `<img src="${themes[theme].mine}" />`;

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

    if (!window.emojiMinesweeper?.isGameFinished()) {
      updateTheme();
    } else {
      window.location.reload();
    }
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

    if (!window.emojiMinesweeper?.isGameFinished()) {
      updateTheme();
    } else {
      window.location.reload();
    }
  }

  function updateTheme() {
    window.emojiMinesweeper?.setTheme(theme);
    window.localStorage.setItem('title', themes[theme].title);
    const title = window.localStorage.getItem('title');
    document.title = title;
    window.localStorage.setItem('mainEmoji', themes[theme].mine);
    header.innerHTML = themes[theme].title;
    themeButton.innerHTML = `<img src="${themes[theme].mine}" / >`;
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
