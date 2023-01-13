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
import favicon from "./utils/favicon.js";
import header from "./components/header.js";
import board from "./components/board.js";
import footer from "./components/footer.js";

/**
 * Data Storage
 */
// Level: beginner || intermediate || expert
let gameLevel = window.localStorage.getItem("level");
if (gameLevel === null) {
  gameLevel = "beginner";
  window.localStorage.setItem("level", "beginner");
}

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

// Games Played
let beginnerPlayed = window.localStorage.getItem("beginnerPlayed");
if (beginnerPlayed === null) {
  window.localStorage.setItem("beginnerPlayed", "0");
}

let intermediatePlayed = window.localStorage.getItem("intermediatePlayed");
if (intermediatePlayed === null) {
  window.localStorage.setItem("intermediatePlayed", "0");
}

let expertPlayed = window.localStorage.getItem("expertPlayed");
if (expertPlayed === null) {
  window.localStorage.setItem("expertPlayed", "0");
}

// Games Won
let beginnerWon = window.localStorage.getItem("beginnerWon");
if (beginnerWon === null) {
  window.localStorage.setItem("beginnerWon", "0");
}

let intermediateWon = window.localStorage.getItem("intermediateWon");
if (intermediateWon === null) {
  window.localStorage.setItem("intermediateWon", "0");
}

let expertWon = window.localStorage.getItem("expertWon");
if (expertWon === null) {
  window.localStorage.setItem("expertWon", "0");
}

// Win Percentage
let beginnerWinPercentage = window.localStorage.getItem(
  "beginnerWinPercentage"
);
if (beginnerWinPercentage === null) {
  window.localStorage.setItem("beginnerWinPercentage", "");
}

let intermediateWinPercentage = window.localStorage.getItem(
  "intermediateWinPercentage"
);
if (intermediateWinPercentage === null) {
  window.localStorage.setItem("intermediateWinPercentage", "");
}

let expertWinPercentage = window.localStorage.getItem("expertWinPercentage");
if (expertWinPercentage === null) {
  window.localStorage.setItem("expertWinPercentage", "");
}

// Best Time
let beginnerBestTime = window.localStorage.getItem("beginnerBestTime");
if (beginnerBestTime === null) {
  window.localStorage.setItem("beginnerBestTime", "");
}

let intermediateBestTime = window.localStorage.getItem("intermediateBestTime");
if (intermediateBestTime === null) {
  window.localStorage.setItem("intermediateBestTime", "");
}

let expertBestTime = window.localStorage.getItem("expertBestTime");
if (expertBestTime === null) {
  window.localStorage.setItem("expertBestTime", "");
}

// Best Moves
let beginnerBestMoves = window.localStorage.getItem("beginnerBestMoves");
if (beginnerBestMoves === null) {
  window.localStorage.setItem("beginnerBestMoves", "");
}

let intermediateBestMoves = window.localStorage.getItem(
  "intermediateBestMoves"
);
if (intermediateBestMoves === null) {
  window.localStorage.setItem("intermediateBestMoves", "");
}

let expertBestMoves = window.localStorage.getItem("expertBestMoves");
if (expertBestMoves === null) {
  window.localStorage.setItem("expertBestMoves", "");
}

let won, played, winPercentage, bestTime, bestMoves;

switch (gameLevel) {
  case "beginner":
    played = beginnerPlayed;
    won = beginnerWon;
    winPercentage = beginnerWinPercentage;
    bestTime = beginnerBestTime;
    bestMoves = beginnerBestMoves;
    break;
  case "intermediate":
    played = intermediatePlayed;
    won = intermediateWon;
    winPercentage = intermediateWinPercentage;
    bestTime = intermediateBestTime;
    bestMoves = intermediateBestMoves;
    break;
  case "expert":
    played = expertPlayed;
    won = expertWon;
    winPercentage = expertWinPercentage;
    bestTime = expertBestTime;
    bestMoves = expertBestMoves;
    break;
}

/**
 * Basics
 */
// Title
let title = window.localStorage.getItem("title") ?? "Emoji Minesweeper";
document.title = title;

// Favicon
favicon(mainEmoji);

/**
 * Elements
 */
// Game container (used for footer at the bottom functionality)
const gameContainer = document.createElement("div");
gameContainer.setAttribute("id", "game-container");
document.body.appendChild(gameContainer);

// Header
header(title, gameContainer);

// Board
board(gameContainer);

// Buttons and Modals Container
const container = document.createElement("div");
container.setAttribute("id", "container");
gameContainer.appendChild(container);

// New Game Button
const newGameButton = document.createElement("button");
newGameButton.setAttribute("id", "new-game-button");
newGameButton.innerHTML = `New Game`;
container.appendChild(newGameButton);

// Stats Button
const statsButton = document.createElement("button");
statsButton.setAttribute("id", "stats-button");
statsButton.innerHTML = `Stats`;
container.appendChild(statsButton);

// statsModal
const statsModal = document.createElement("div");
statsModal.setAttribute("id", "stats-modal");

// Stats: Level
statsModal.innerHTML += `<p class="level">${
  gameLevel.charAt(0).toUpperCase() + gameLevel.slice(1)
}</p>`;

const statsTable = document.createElement("div");
statsTable.setAttribute("id", "stats-table");

// Stats: Played
statsTable.innerHTML += `<p class="label">Played</p>`;
if (played) {
  statsTable.innerHTML += `<p class="value">${played}</p>`;
} else {
  statsTable.innerHTML += `<p class="value">0</p>`;
}

// Stats: Won
statsTable.innerHTML += `<p class="label">Won</p>`;
if (won) {
  statsTable.innerHTML += `<p class="value">${won}</p>`;
} else {
  statsTable.innerHTML += `<p class="value">0</p>`;
}

// Stats: Win percentage
statsTable.innerHTML += `<p class="label">Win %</p>`;
if (winPercentage) {
  statsTable.innerHTML += `<p class="value">${(winPercentage * 100).toFixed(
    2
  )}</p>`;
} else {
  statsTable.innerHTML += `<p class="value">N/A</p>`;
}

// Stats: Best Time
statsTable.innerHTML += `<p class="label">Best Time</p>`;
if (bestTime) {
  statsTable.innerHTML += `<p class="value">${bestTime}</p>`;
} else {
  statsTable.innerHTML += `<p class="value">N/A</p>`;
}

// Stats: Best Moves
statsTable.innerHTML += `<p class="label">Best Moves</p>`;
if (bestMoves) {
  statsTable.innerHTML += `<p class="value">${bestMoves}</p>`;
} else {
  statsTable.innerHTML += `<p class="value">N/A</p>`;
}

statsModal.appendChild(statsTable);

// Stats: Clear Data Button
const clearDataButton = document.createElement("button");
clearDataButton.innerHTML = `Clear Data`;
statsModal.appendChild(clearDataButton);

container.appendChild(statsModal);

// Stats modal in debug mode
if (window.location.hash === "#debug") {
  statsModal.innerHTML = `<h3>Debug Mode<h3>`;
}

// Help Modal
const helpModal = document.createElement("div");
helpModal.setAttribute("id", "help-modal");
helpModal.innerHTML += `
<div>
  🖱️ Left-click to <span style="font-weight:600;">open</span> a square, right-click to <span style="font-weight:600;">flag</span> a square
  <hr>
  1️⃣2️⃣3️⃣ Switch between <span style="font-weight:600;">levels</span>, beginner, intermediate, expert (or use ⌨️ keys 1, 2, 3)
  <hr>
  💣/🌺/🍄/🐻/🐙 Switch between <span style="font-weight:600;">themes</span> (or use ⌨️ left/right arrows)
  <hr>
  ❔ Toggle <span style="font-weight:600;">help</span>
  <hr>
  🚩 Toggle <span style="font-weight:600;">flag mode</span>: flag with touch/right-click (for touchscreens)
</div>
`;

container.appendChild(helpModal);

// Level and Mode Buttons
const emojiButtonContainer = document.createElement("div");
emojiButtonContainer.setAttribute("id", "emoji-button-container");
gameContainer.appendChild(emojiButtonContainer);

const beginnerButton = document.createElement("div");
beginnerButton.className = `emoji-button`;
beginnerButton.innerHTML = `1️⃣`;
if (level === "beginner") {
  beginnerButton.classList.add("emoji-button-clicked");
}
emojiButtonContainer.appendChild(beginnerButton);

const intermediateButton = document.createElement("div");
intermediateButton.className = `emoji-button`;
intermediateButton.innerHTML = `2️⃣`;
if (level === "intermediate") {
  intermediateButton.classList.add("emoji-button-clicked");
}
emojiButtonContainer.appendChild(intermediateButton);

const expertButton = document.createElement("div");
expertButton.className = `emoji-button`;
expertButton.innerHTML = `3️⃣`;
if (level === "expert") {
  expertButton.classList.add("emoji-button-clicked");
}
emojiButtonContainer.appendChild(expertButton);

const modeButton = document.createElement("div");
modeButton.className = `emoji-button`;
modeButton.innerHTML = mainEmoji;

emojiButtonContainer.appendChild(modeButton);

const helpButton = document.createElement("div");
helpButton.className = `emoji-button`;
helpButton.innerHTML = `❔`;
emojiButtonContainer.appendChild(helpButton);

const flagButton = document.createElement("div");
flagButton.className = `emoji-button`;
flagButton.innerHTML = `🚩`;
// if (/Android|iPhone/i.test(navigator.userAgent)) {
emojiButtonContainer.appendChild(flagButton);
// }

// Content Wrap (used for footer at the bottom functionality)
const contentWrap = document.createElement("div");
contentWrap.setAttribute("id", "content-wrap");
gameContainer.appendChild(contentWrap);

// Footer
footer(contentWrap);

/**
 * Button Functionality
 */
// New Game Button functionality
newGameButton.addEventListener("click", () => {
  window.location.reload();
});

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

// Clear Data Button Functionality
clearDataButton.addEventListener("click", () => {
  window.localStorage.clear();
  window.location.reload();
});

// Level Buttons Functionality
beginnerButton.addEventListener("click", () => {
  if (level !== "beginner") {
    localStorage.setItem("level", "beginner");
    window.location.reload();
  }
});

intermediateButton.addEventListener("click", () => {
  if (level !== "intermediate") {
    localStorage.setItem("level", "intermediate");
    window.location.reload();
  }
});

expertButton.addEventListener("click", () => {
  if (level !== "expert") {
    localStorage.setItem("level", "expert");
    window.location.reload();
  }
});

// Mode Buttons Functionality
modeButton.addEventListener("click", () => {
  themeSwitcher();
});

// Flag Mode Button Functionality
let flagMode = false;
flagButton.addEventListener("click", () => {
  if (flagMode) {
    localStorage.setItem("flagMode", "false");
    flagButton.classList.remove("emoji-button-clicked");
    flagMode = false;
  } else {
    localStorage.setItem("flagMode", "true");
    flagButton.classList.add("emoji-button-clicked");
    flagMode = true;
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

/**
 * Utility Functions
 */
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
    theme = "mine";
    localStorage.setItem("theme", theme);
  }
  window.location.reload();
}

function reverseThemeSwitcher() {
  if (theme === "mine") {
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
  window.location.reload();
}

/**
 * Keyboard Action Handling
 */
document.addEventListener("keydown", (event) => {
  // Switch Themes
  if (event.code === "ArrowRight") {
    themeSwitcher();
  }

  if (event.code === "ArrowLeft") {
    reverseThemeSwitcher();
  }
});
