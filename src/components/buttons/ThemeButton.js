/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
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
  themeButton.innerHTML = `<img src="../../${themes[theme].mine}" />`;

  // Theme Button Functionality
  themeButton.addEventListener('click', () => {
    themeSwitcher();
  });

  // Utility Functions
  function themeSwitcher() {
    if (theme === 'mine') {
      theme = 'flower';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'flower') {
      theme = 'mushroom';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'mushroom') {
      theme = 'bear';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'bear') {
      theme = 'surf';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'surf') {
      header.classList.add('japanese');
      window.localStorage.setItem('japanese', 'true');
      theme = 'japan';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'japan') {
      header.classList.remove('japanese');
      window.localStorage.setItem('japanese', 'false');
      theme = 'mine';
      window.localStorage.setItem('theme', theme);
    }

    if (!gameFinished) {
      switchTheme();
    } else {
      window.location.reload();
    }
  }

  function reverseThemeSwitcher() {
    if (theme === 'mine') {
      header.classList.add('japanese');
      window.localStorage.setItem('japanese', 'true');
      theme = 'japan';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'japan') {
      header.classList.remove('japanese');
      window.localStorage.setItem('japanese', 'false');
      theme = 'surf';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'surf') {
      theme = 'bear';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'bear') {
      theme = 'mushroom';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'mushroom') {
      theme = 'flower';
      window.localStorage.setItem('theme', theme);
    } else if (theme === 'flower') {
      theme = 'mine';
      window.localStorage.setItem('theme', theme);
    }

    if (!gameFinished) {
      switchTheme();
    } else {
      window.location.reload();
    }
  }

  function switchTheme() {
    WON = loadImage(themes[theme].won);
    LOST = loadImage(themes[theme].lost);
    MINE = loadImage(themes[theme].mine);
    DETONATION = loadImage(themes[theme].detonation);
    window.localStorage.setItem('title', themes[theme].title);
    const title = window.localStorage.getItem('title');
    document.title = title;
    window.localStorage.setItem('mainEmoji', themes[theme].mine);
    header.innerHTML = themes[theme].title;
    themeButton.innerHTML = `<img src="../../${themes[theme].mine}" / >`;
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    // Switch Themes
    if (event.code === 'ArrowRight') {
      themeSwitcher();
    }

    if (event.code === 'ArrowLeft') {
      reverseThemeSwitcher();
    }
  });
  return themeButton;
}
