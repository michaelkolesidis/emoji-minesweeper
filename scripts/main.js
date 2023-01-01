/*
 *  Emoji Minesweeper
 *  Copyright (c) 2022 Michael Kolesidis
 *  GNU General Public License v3.0
 *
 * main.js contains the rest of the UI of the game,
 * anything that happens outside of the board. It
 * also handles the storage and the display of
 * the saved stats.
 */

/**
 * Data Storage
 */
// Level: beginner || intermediate || expert
let gameLevel = window.localStorage.getItem("level");
if (gameLevel === null) {
  gameLevel = "beginner";
  window.localStorage.setItem("level", "beginner");
}

// Flower Mode
let isFlower = window.localStorage.getItem("flower");
if (isFlower === null) {
  window.localStorage.setItem("flower", "false");
}
let flower = JSON.parse(isFlower);

// statsModal
window.localStorage.setItem("statsModalOpen", "false");

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
if (flower) {
  document.title = `Emoji Flower Field`;
} else {
  document.title = `Emoji Minesweeper`;
}

// Favicon
if (flower) {
  const favicon =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  favicon.rel = "icon";
  favicon.href =
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌺</text></svg>";
  document.getElementsByTagName("head")[0].appendChild(favicon);
} else {
  const favicon =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "../assets/favicon.ico";
  document.getElementsByTagName("head")[0].appendChild(favicon);
}

/**
 * Elements
 */
// Header
const header = document.createElement("div");
header.className = `header`;
header.innerHTML =
  flower === true
    ? `<span style="--i:13">E</span>
<span style="--i:14">m</span>
<span style="--i:15">o</span>
<span style="--i:16">j</span>
<span style="--i:17">i</span>
<span style="--i:12">&nbsp;</span>
<span style="--i:1">F</span>
<span style="--i:2">l</span>
<span style="--i:3">o</span>
<span style="--i:4">w</span>
<span style="--i:5">e</span>
<span style="--i:6">r</span>
<span style="--i:12">&nbsp;</span>
<span style="--i:7">F</span>
<span style="--i:8">i</span>
<span style="--i:9">e</span>
<span style="--i:9">l</span>
<span style="--i:9">d</span>
`
    : `<span style="--i:13">E</span>
<span style="--i:14">m</span>
<span style="--i:15">o</span>
<span style="--i:16">j</span>
<span style="--i:17">i</span>
<span style="--i:12">&nbsp;</span>
<span style="--i:1">M</span>
<span style="--i:2">i</span>
<span style="--i:3">n</span>
<span style="--i:4">e</span>
<span style="--i:5">s</span>
<span style="--i:6">w</span>
<span style="--i:7">e</span>
<span style="--i:8">e</span>
<span style="--i:9">p</span>
<span style="--i:10">e</span>
<span style="--i:11">r</span>`;
header.style.fontSize = "31px";
header.style.letterSpacing = "1px";
document.body.appendChild(header);

// Board
const board = document.createElement("div");
board.setAttribute("id", "board");
switch (level) {
  case "beginner":
    board.style.height = "317px"; // canvas size - 0.6px
    break;
  case "intermediate":
    board.style.height = "541px";
    break;
  case "expert":
    board.style.height = "541px";
    break;
}

document.body.appendChild(board);

// Buttons and Modals Container
const container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

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

// Help Modal
const helpModal = document.createElement("div");
helpModal.setAttribute("id", "help-modal");
helpModal.innerHTML += `<div>
🖱️ Left-click to <span style="font-weight:600;">reveal</span> a cell, right-click to <span style="font-weight:600;">flag</span> a cell
<hr>
1️⃣2️⃣3️⃣ Switch between <span style="font-weight:600;">levels</span>, beginner, intermediate, expert, or use ⌨️ keys 1,2, 3
<hr>
💣/🌺 Switch between <span style="font-weight:600;">flower and mine</span> modes or use ⌨️ left/right arrows
<hr>
❔ Toggle <span style="font-weight:600;">help</span>
<hr>
🚩 Toggle <span style="font-weight:600;">flag mode</span>: flag with touch/right-click (for touchscreens)
</div>
`;

container.appendChild(helpModal);

// Level and Mode Buttons
const levelModeContainer = document.createElement("div");
levelModeContainer.setAttribute("id", "level-mode-container");
document.body.appendChild(levelModeContainer);

const beginnerButton = document.createElement("div");
beginnerButton.className = `emoji-button`;
beginnerButton.innerHTML = `1️⃣`;
if (level === "beginner") {
  beginnerButton.classList.add("emoji-button-clicked");
}
levelModeContainer.appendChild(beginnerButton);

const intermediateButton = document.createElement("div");
intermediateButton.className = `emoji-button`;
intermediateButton.innerHTML = `2️⃣`;
if (level === "intermediate") {
  intermediateButton.classList.add("emoji-button-clicked");
}
levelModeContainer.appendChild(intermediateButton);

const expertButton = document.createElement("div");
expertButton.className = `emoji-button`;
expertButton.innerHTML = `3️⃣`;
if (level === "expert") {
  expertButton.classList.add("emoji-button-clicked");
}
levelModeContainer.appendChild(expertButton);

const modeButton = document.createElement("div");
modeButton.className = `emoji-button`;
modeButton.innerHTML = flower ? `🌺` : `💣`;
levelModeContainer.appendChild(modeButton);

const helpButton = document.createElement("div");
helpButton.className = `emoji-button`;
helpButton.innerHTML = `❔`;
levelModeContainer.appendChild(helpButton);

const flagButton = document.createElement("div");
flagButton.className = `emoji-button`;
flagButton.innerHTML = `🚩`;
// if (/Android|iPhone/i.test(navigator.userAgent)) {
levelModeContainer.appendChild(flagButton);
// }

// Footer
const footer = document.createElement("footer");
footer.innerHTML = `<a href="https://github.com/michaelkolesidis/minesweeper-emoji" target="_blank" rel="noopener"><img src="../assets/m.svg"/></a>`;
document.body.appendChild(footer);

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
  flower
    ? localStorage.setItem("flower", "false")
    : localStorage.setItem("flower", "true");
  window.location.reload();
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
