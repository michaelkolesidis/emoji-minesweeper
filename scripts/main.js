/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * main.js contains the rest of the UI of the game,
 * anything that happens outside of the board. It
 * also handles the storage and the display of
 * the saved stats.
 */

// import favicon from "./utils/favicon.js";
import Header from "./components/header.js";
import Board from "./components/board.js";
import Footer from "./components/footer.js";
import StatsModal from "./components/modals/statsModal.js";
import HelpModal from "./components/modals/helpModal.js";
import NewGameButton from "./components/buttons/newGameButton.js";
import StatsButton from "./components/buttons/statsButton.js";
import BeginnerButton from "./components/buttons/beginnerButton.js";
import IntermediateButton from "./components/buttons/intermediateButton.js";
import ExpertButton from "./components/buttons/expertButton.js";
import ThemeButton from "./components/buttons/themeButton.js";
import HelpButton from "./components/buttons/helpButton.js";
import FlagButton from "./components/buttons/flagButton.js";

/**
 * Basics
 */
// Theme
let theme = window.localStorage.getItem("theme");
if (theme === null) {
  theme = "mine";
  window.localStorage.setItem("theme", "mine");
}

// Emoji
let mainEmoji = window.localStorage.getItem("mainEmoji");
if (mainEmoji === null) {
  mainEmoji = "💣";
}

// Modal
window.localStorage.setItem("modalOpen", "false");

// Flag mode
window.localStorage.setItem("flagMode", "false");

// Title
let title = window.localStorage.getItem("title") ?? "Emoji Minesweeper";
document.title = title;

// Favicon
// favicon(mainEmoji);

/**
 * Elements
 */
// Game container (used for footer at the bottom functionality)
const gameContainer = document.createElement("div");
gameContainer.setAttribute("id", "game-container");
document.body.appendChild(gameContainer);

// Header
let header = Header(title);
gameContainer.appendChild(header);

// Board
const board = Board();
gameContainer.appendChild(board);

// Buttons and Modals Container
const container = document.createElement("div");
container.setAttribute("id", "container");
gameContainer.appendChild(container);

// New Game Button
const newGameButton = NewGameButton();
container.appendChild(newGameButton);

// Stats Button
const statsButton = StatsButton();
container.appendChild(statsButton);

// statsModal
const statsModal = StatsModal();
container.appendChild(statsModal);

// Help Modal
const helpModal = HelpModal();
container.appendChild(helpModal);

// Emoji Buttons Container
const emojiButtonsContainer = document.createElement("div");
emojiButtonsContainer.setAttribute("id", "emoji-buttons-container");
gameContainer.appendChild(emojiButtonsContainer);

// Beginner Button
const beginnerButton = BeginnerButton(level);
emojiButtonsContainer.appendChild(beginnerButton);

// Intermediate Button
const intermediateButton = IntermediateButton(level);
emojiButtonsContainer.appendChild(intermediateButton);

// Expert Button
const expertButton = ExpertButton(level);
emojiButtonsContainer.appendChild(expertButton);

// Theme Button
const themeButton = ThemeButton(mainEmoji, header);
emojiButtonsContainer.appendChild(themeButton);

// Help Button
const helpButton = HelpButton();
emojiButtonsContainer.appendChild(helpButton);

// Flag Button
const flagButton = FlagButton(board);
// if (/Android|iPhone/i.test(navigator.userAgent)) {
emojiButtonsContainer.appendChild(flagButton);
// }

// Content Wrap (used for footer at the bottom functionality)
const contentWrap = document.createElement("div");
contentWrap.setAttribute("id", "content-wrap");
gameContainer.appendChild(contentWrap);

// Footer
const footer = Footer();
contentWrap.appendChild(footer);

/**
 * Button Functionality
 */
// Stats Button Functionality
let statsModalOpen = false;
statsButton.addEventListener("click", () => {
  if (statsModalOpen) {
    // Close stats modal
    setTimeout(() => {
      statsModal.style.zIndex = -1;
    }, 500);
    statsModal.style.opacity = 0;
    statsModalOpen = false;
    window.localStorage.setItem("modalOpen", "false");
  } else if (!statsModalOpen) {
    // Close help modal
    helpModal.style.opacity = 0;
    helpModalOpen = false;
    window.localStorage.setItem("modalOpen", "false");
    helpButton.style.opacity = "1";

    // Open stats modal
    statsModal.style.zIndex = 2;
    statsModal.style.opacity = 1;
    statsModalOpen = true;
    window.localStorage.setItem("modalOpen", "true");
  }
});

// Help Button Functionality
let helpModalOpen = false;
helpButton.addEventListener("click", () => {
  if (helpModalOpen) {
    // Close help modal
    setTimeout(() => {
      helpModal.style.zIndex = -1;
    }, 500);
    helpModal.style.opacity = 0;
    helpModalOpen = false;
    window.localStorage.setItem("modalOpen", "false");
    helpButton.classList.remove("emoji-button-clicked");
  } else if (!helpModalOpen) {
    // Close stats modal
    if (statsModalOpen) {
      setTimeout(() => {
        statsModal.style.zIndex = -1;
      }, 500);
      statsModal.style.opacity = 0;
      statsModalOpen = false;
      window.localStorage.setItem("modalOpen", "false");
    }

    // Open help modal
    helpModal.style.zIndex = 2;
    helpModal.style.opacity = 1;
    helpModalOpen = true;
    window.localStorage.setItem("modalOpen", "true");
    helpButton.classList.add("emoji-button-clicked");
  }
});
