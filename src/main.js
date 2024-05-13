/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 *  main.js contains the rest of the UI of the game,
 *  anything that happens outside of the board. It
 *  also handles the storage and the display of
 *  the saved stats.
 */

import Header from './components/Header.js';
import Board from './components/Board.js';
import StatsModal from './components/modals/StatsModal.js';
import HelpModal from './components/modals/HelpModal.js';
import NewGameButton from './components/buttons/NewGameButton.js';
import StatsButton from './components/buttons/StatsButton.js';
import BeginnerButton from './components/buttons/BeginnerButton.js';
import IntermediateButton from './components/buttons/IntermediateButton.js';
import ExpertButton from './components/buttons/ExpertButton.js';
import CustomButton from './components/buttons/CustomButton.js';
import CustomModal from './components/modals/CustomModal.js';
import ThemeButton from './components/buttons/ThemeButton.js';
import HelpButton from './components/buttons/HelpButton.js';
import FlagButton from './components/buttons/FlagButton.js';
import DarkModeButton from './components/buttons/DarkModeButton.js';
import DonateButton from './components/buttons/DonateButton.js';
import Forcer from './components/Forcer.js';

/**
 * Basics
 */
// Theme
let theme = window.localStorage.getItem('theme');
if (theme === null) {
  window.localStorage.setItem('theme', 'mine');
}

// Dark Mode
let darkMode = JSON.parse(localStorage.getItem('darkMode'));
if (darkMode === null) {
  window.localStorage.setItem('darkMode', 'false');
}
if (darkMode) {
  document.body.classList.add('dark-mode');
}

// Emoji
let mainEmoji = window.localStorage.getItem('mainEmoji');
if (mainEmoji === null) {
  mainEmoji = themes[theme]['mine'];
}

// Modal
window.localStorage.setItem('modalOpen', 'false');

window.localStorage.setItem('statsModalOpen', 'false');
window.localStorage.setItem('helpModalOpen', 'false');
window.localStorage.setItem('customModalOpen', 'false');

// Flag mode
window.localStorage.setItem('flagMode', 'false');

// Title
let title = window.localStorage.getItem('title') ?? 'Emoji Minesweeper';
document.title = title;

/**
 * Elements
 */
// Game container
const gameContainer = document.createElement('div');
gameContainer.setAttribute('id', 'game-container');
document.body.appendChild(gameContainer);

// Header
let header = Header(title);
gameContainer.appendChild(header);

// Board
const board = Board();
gameContainer.appendChild(board);

// Modals Container
const container = document.createElement('div');
container.setAttribute('id', 'container');
gameContainer.appendChild(container);

// Stats Modal
const statsModal = StatsModal();
container.appendChild(statsModal);

// Help Modal
const helpModal = HelpModal();
container.appendChild(helpModal);

// Emoji Buttons Container
const emojiButtonsContainer = document.createElement('div');
emojiButtonsContainer.setAttribute('id', 'emoji-buttons-container');
gameContainer.appendChild(emojiButtonsContainer);

// New Game Button
const newGameButton = NewGameButton();
emojiButtonsContainer.appendChild(newGameButton);

// Beginner Button
const beginnerButton = BeginnerButton();
emojiButtonsContainer.appendChild(beginnerButton);

// Intermediate Button
const intermediateButton = IntermediateButton();
emojiButtonsContainer.appendChild(intermediateButton);

// Expert Button
const expertButton = ExpertButton();
emojiButtonsContainer.appendChild(expertButton);

// Custom Button
const customButton = CustomButton();
emojiButtonsContainer.appendChild(customButton);

// Stats Button
const statsButton = StatsButton();
emojiButtonsContainer.appendChild(statsButton);

// Theme Button
const themeButton = ThemeButton(header);
emojiButtonsContainer.appendChild(themeButton);

// Custom Modal
const customModal = CustomModal();
container.appendChild(customModal);

// Help Button
const helpButton = HelpButton();
emojiButtonsContainer.appendChild(helpButton);

// Flag Button
const flagButton = FlagButton(board);
emojiButtonsContainer.appendChild(flagButton);

// Dark Mode Button
const darkModeButton = DarkModeButton(darkMode);
emojiButtonsContainer.appendChild(darkModeButton);

// Donate Button
// const donateButton = DonateButton();
// gameContainer.appendChild(donateButton);

/**
 * Custom Modal
 */
let customModalOpen = false;

// Utility Function
function toggleCustomModal() {
  if (customModalOpen) {
    // Close custom modal
    setTimeout(() => {
      customModal.style.zIndex = '-1';
    }, 500);
    customModal.style.opacity = '0';
    customModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
  } else {
    // Close help modal
    setTimeout(() => {
      helpModal.style.zIndex = '-1';
    }, 500);
    helpModal.style.opacity = '0';
    helpModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
    helpButton.classList.remove('emoji-button-clicked');

    // Close stats modal
    setTimeout(() => {
      statsModal.style.zIndex = '-1';
    }, 500);
    statsModal.style.opacity = '0';
    statsModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');

    customModal.style.zIndex = '2';
    customModal.style.opacity = '1';
    customModalOpen = true;
    window.localStorage.setItem('modalOpen', 'true');
  }
}

// Custom Button Functionality
customButton.addEventListener('click', () => {
  localStorage.setItem('modalOpen', 'true');
  toggleCustomModal();
});

/**
 * Stats Modal
 */
let statsModalOpen = false;

// Utility Function
function toggleStatsModal() {
  if (statsModalOpen) {
    // Close stats modal
    setTimeout(() => {
      statsModal.style.zIndex = '-1';
    }, 500);
    statsModal.style.opacity = '0';
    statsModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
  } else if (!statsModalOpen) {
    // Close custom modal
    setTimeout(() => {
      customModal.style.zIndex = '-1';
    }, 500);
    customModal.style.opacity = '0';
    customModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
    // Close help modal
    setTimeout(() => {
      helpModal.style.zIndex = '-1';
    }, 500);
    helpModal.style.opacity = '0';
    helpModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
    helpButton.classList.remove('emoji-button-clicked');
    // Open stats modal
    statsModal.style.zIndex = '2';
    statsModal.style.opacity = '1';
    statsModalOpen = true;
    window.localStorage.setItem('modalOpen', 'true');
  }
}

// Stats Button Functionality
statsButton.addEventListener('click', () => {
  toggleStatsModal();
});

// Keyboard Action Handling
document.addEventListener('keydown', e => {
  if (e.code === 'KeyS') {
    toggleStatsModal();
  }
});

/**
 * Help Modal
 */
let helpModalOpen = false;

// Utility Function
function toggleHelpModal() {
  if (helpModalOpen) {
    // Close help modal
    setTimeout(() => {
      helpModal.style.zIndex = '-1';
    }, 500);
    helpModal.style.opacity = '0';
    helpModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
    helpButton.classList.remove('emoji-button-clicked');
  } else if (!helpModalOpen) {
    // Close custom modal
    setTimeout(() => {
      customModal.style.zIndex = '-1';
    }, 500);
    customModal.style.opacity = '0';
    customModalOpen = false;
    window.localStorage.setItem('modalOpen', 'false');
    // Close stats modal
    if (statsModalOpen) {
      setTimeout(() => {
        statsModal.style.zIndex = '-1';
      }, 500);
      statsModal.style.opacity = '0';
      statsModalOpen = false;
      window.localStorage.setItem('modalOpen', 'false');
    }
    // Open help modal
    helpModal.style.zIndex = '2';
    helpModal.style.opacity = '1';
    helpModalOpen = true;
    window.localStorage.setItem('modalOpen', 'true');
    helpButton.classList.add('emoji-button-clicked');
  }
}

// Help Button Functionality
helpButton.addEventListener('click', () => {
  toggleHelpModal();
});

// Keyboard Action Handling
document.addEventListener('keydown', e => {
  if (e.code === 'KeyH') {
    toggleHelpModal();
  }
});

// Forcer
if (window.location.hash === '#debug') {
  const forcer = Forcer();
  gameContainer.appendChild(forcer);

  /**
   * Forcer functionality
   */
  const submitButton = document.getElementById('forcer-submit');

  submitButton.addEventListener('click', function () {
    const numbers = document.getElementById('forcer-input').value;
    if (numbers) {
      const mines = Array.from(
        new Set(
          numbers.split(',').map(function (mine) {
            return parseInt(mine, 10);
          })
        )
      );
      localStorage.setItem('mines', mines);
      localStorage.setItem('numberOfMines', mines.length);
      location.reload();
    }
  });
}
