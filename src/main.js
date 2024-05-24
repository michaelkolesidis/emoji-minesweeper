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

// Elements
import Header from './components/Header.js';
import Board from './components/Board.js';
import Modal from './components/modals/Modal.js';
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
import Forcer from './components/Forcer.js';

// Utilities
import { greet } from './utils/consoleUtils.js';
import { closeModal, openModal } from './utils/modalUtils.js';

/**
 * Basics
 */
greet();

// Theme
let theme = window.localStorage.getItem('theme');
if (theme === null) {
  window.localStorage.setItem('theme', 'mine');
}

// Dark Mode
let darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
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

// Modal
const modal = Modal();
container.appendChild(modal);

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

// Help Button
const helpButton = HelpButton();
emojiButtonsContainer.appendChild(helpButton);

// Flag Button
const flagButton = FlagButton(board);
emojiButtonsContainer.appendChild(flagButton);

// Dark Mode Button
const darkModeButton = DarkModeButton(darkMode);
emojiButtonsContainer.appendChild(darkModeButton);

/**
 * Modals
 */
let modalOpen = false;
window.localStorage.setItem('customModalOpen', 'false');

/**
 * Custom Modal
 */
// Utility Function
function toggleCustomModal() {
  if (modalOpen) {
    if (modal.id === 'custom-modal') {
      // If custom modal is open
      modalOpen = false;
      window.localStorage.setItem('customModalOpen', 'false');
      closeModal();
    } else {
      // If another modal is open
      CustomModal();
      window.localStorage.setItem('customModalOpen', 'true');
    }
  } else {
    // If no modals are open
    modal.id = 'custom-modal';
    modalOpen = true;
    window.localStorage.setItem('customModalOpen', 'true');
    openModal();
    CustomModal();
  }
}

// Custom Button Functionality
customButton.addEventListener('click', () => {
  toggleCustomModal();
});

/**
 * Stats Modal
 */
// Utility Function
function toggleStatsModal() {
  if (modalOpen) {
    if (modal.id === 'stats-modal') {
      // If stats modal is open
      modalOpen = false;
      closeModal();
    } else {
      // If another modal is open
      StatsModal();
    }
  } else {
    // If no modals are open
    modal.id = 'stats-modal';
    modalOpen = true;
    openModal();
    StatsModal();
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
// Utility Function
function toggleHelpModal() {
  if (modalOpen) {
    if (modal.id === 'help-modal') {
      // If help modal is open
      modalOpen = false;
      closeModal();
    } else {
      // If another modal is open
      HelpModal();
    }
  } else {
    // If no modals are open
    modal.id = 'help-modal';
    modalOpen = true;
    openModal();
    HelpModal();
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

/**
 * End modal
 */
document.addEventListener('gameHasEnded', () => {
  modal.id = 'end-modal';
  modalOpen = true;
  openModal();

  // Display stats in modal when the game ends
  const time = window.localStorage.getItem('time');
  const bbbv = window.localStorage.getItem('bbbv');
  const bbbvPerSec = window.localStorage.getItem('bbbvPerSec');
  const efficinecny = window.localStorage.getItem('efficinecny');

  modal.innerHTML = '';
  modal.innerHTML += `<a 
                        class="label help-link" 
                        href="https://github.com/michaelkolesidis/emoji-minesweeper?tab=readme-ov-file#time" 
                        target="_blank"
                      >Time</a>`;
  modal.innerHTML += `<p class="value">${time} sec</p>`;
  modal.innerHTML += `<a 
                        class="label help-link" 
                        href="https://github.com/michaelkolesidis/emoji-minesweeper?tab=readme-ov-file#3bv" 
                        target="_blank"
                      >3BV</a>`;
  modal.innerHTML += `<p class="value">${bbbv}</p>`;
  modal.innerHTML += `<a 
                        class="label help-link" 
                        href="https://github.com/michaelkolesidis/emoji-minesweeper?tab=readme-ov-file#3bvs" 
                        target="_blank"
                      >3BV/s</a>`;
  modal.innerHTML += `<p class="value">${bbbvPerSec}</p>`;
  modal.innerHTML += `<a 
                        class="label help-link" 
                        href="https://github.com/michaelkolesidis/emoji-minesweeper?tab=readme-ov-file#moves" 
                        target="_blank"
                      >Moves</a>`;
  modal.innerHTML += `<p class="value">${moves}</p>`;
  modal.innerHTML += `<a 
                        class="label help-link" 
                        href="https://github.com/michaelkolesidis/emoji-minesweeper?tab=readme-ov-file#efficiency" 
                        target="_blank"
                      >Efficiency</a>`;
  modal.innerHTML += `<p class="value">${efficinecny}%</p>`;
  modal.innerHTML += `<button id="end-button">Close</button>`;

  const endButton = document.getElementById('end-button');
  endButton.addEventListener('click', () => {
    modalOpen = false;
    closeModal();
  });
});

/**
 * Forcer
 */
if (window.location.hash === '#debug') {
  const forcer = Forcer();
  gameContainer.appendChild(forcer);

  // Forcer functionality
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
      window.localStorage.setItem('mines', mines);
      window.localStorage.setItem('numberOfMines', mines.length);
      location.reload();
    }
  });
}
