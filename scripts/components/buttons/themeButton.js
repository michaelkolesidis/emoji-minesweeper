/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * themeButton.js contains all the theme
 * button functionality, the button,
 * the utility functions and the keyboard
 * event handling.
 */

export default function ThemeButton(mainEmoji, header) {
  // Button
  const themeButton = document.createElement("div");
  themeButton.title = `Change theme`;
  themeButton.className = `emoji-button`;
  themeButton.innerHTML = mainEmoji;

  // Theme Button Functionality
  themeButton.addEventListener("click", () => {
    themeSwitcher();
  });

  // Utility Functions
  function themeSwitcher() {
    if (theme === "mine") {
      theme = "flower";
      localStorage.setItem("theme", theme);
    } else if (theme === "flower") {
      theme = "mushroom";
      localStorage.setItem("theme", theme);
    } else if (theme === "mushroom") {
      theme = "bear";
      localStorage.setItem("theme", theme);
    } else if (theme === "bear") {
      theme = "octopus";
      localStorage.setItem("theme", theme);
    } else if (theme === "octopus") {
      header.classList.add("japanese");
      localStorage.setItem("japanese", "true");
      theme = "japan";
      localStorage.setItem("theme", theme);
    } else if (theme === "japan") {
      header.classList.remove("japanese");
      localStorage.setItem("japanese", "false");
      theme = "mine";
      localStorage.setItem("theme", theme);
    }

    if (!gameFinished) {
      switchTheme();
    } else {
      window.location.reload();
    }
  }

  function reverseThemeSwitcher() {
    if (theme === "mine") {
      header.classList.add("japanese");
      localStorage.setItem("japanese", "true");
      theme = "japan";
      localStorage.setItem("theme", theme);
    } else if (theme === "japan") {
      header.classList.remove("japanese");
      localStorage.setItem("japanese", "false");
      theme = "octopus";
      localStorage.setItem("theme", theme);
    } else if (theme === "octopus") {
      theme = "bear";
      localStorage.setItem("theme", theme);
    } else if (theme === "bear") {
      theme = "mushroom";
      localStorage.setItem("theme", theme);
    } else if (theme === "mushroom") {
      theme = "flower";
      localStorage.setItem("theme", theme);
    } else if (theme === "flower") {
      theme = "mine";
      localStorage.setItem("theme", theme);
    }

    if (!gameFinished) {
      switchTheme();
    } else {
      window.location.reload();
    }
  }

  function switchTheme() {
    MINE = themes[theme]["mine"];
    DETONATION = themes[theme]["detonation"];
    WON = themes[theme]["won"];
    LOST = themes[theme]["lost"];
    window.localStorage.setItem("title", themes[theme]["title"]);
    let title = window.localStorage.getItem("title");
    document.title = title;
    window.localStorage.setItem("mainEmoji", themes[theme]["mine"]);
    // favicon(themes[theme]["mine"]);
    header.innerHTML = themes[theme]["title"];
    themeButton.innerHTML = themes[theme]["mine"];
  }

  // Keyboard Action Handling
  document.addEventListener("keydown", (event) => {
    // Switch Themes
    if (event.code === "ArrowRight") {
      themeSwitcher();
    }

    if (event.code === "ArrowLeft") {
      reverseThemeSwitcher();
    }
  });
  return themeButton;
}
