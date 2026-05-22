/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  main.js contains the rest of the UI of the game,
 *  anything that happens outside of the board. It
 *  also handles the storage and the display of
 *  the saved stats.
 */

// Elements
import Header from './components/Header.js';
import { themes } from './themes.js';
import MuteButton from './components/buttons/MuteButton.js';
import Board from './components/Board.js';
import Modal from './components/modals/Modal.js';
import StatsModal from './components/modals/StatsModal.js';
import HelpModal, {
  preloadHelpModalAssets,
} from './components/modals/HelpModal.js';
import NewGameButton from './components/buttons/NewGameButton.js';
import StatsButton from './components/buttons/StatsButton.js';
import BeginnerButton from './components/buttons/BeginnerButton.js';
import IntermediateButton from './components/buttons/IntermediateButton.js';
import ExpertButton from './components/buttons/ExpertButton.js';
import CustomButton from './components/buttons/CustomButton.js';
import CustomModal from './components/modals/CustomModal.js';
import ThemeButton from './components/buttons/ThemeButton.js';
import HelpButton from './components/buttons/HelpButton.js';
import DarkModeButton from './components/buttons/DarkModeButton.js';
import Forcer from './components/Forcer.js';
import ICBLLogo from './components/ICBLLogo.js';

// Utilities
import { greet } from './utils/consoleUtils.js';
import { closeModal, openModal, resetModal } from './utils/modalUtils.js';
import {
  getLevelSettings,
  getMatchingStandardLevel,
  setLevel,
  syncLevelButtons,
} from './utils/levelUtils.js';
import {
  preloadLogoAssets,
  setDesktopLogoTheme,
} from './utils/logoUtils.js';
import { showTooltip } from './utils/mobileTooltip.js';
import {
  preloadFont,
  scheduleAfterInitialRender,
} from './utils/assetPreloader.js';
import { registerServiceWorker } from './utils/serviceWorker.js';

/**
 * Basics
 */
greet();
registerServiceWorker();

// Theme
let theme = window.localStorage.getItem('theme');
if (theme === null) {
  theme = 'mine';
  window.localStorage.setItem('theme', theme);
}

// Dark Mode
let darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
if (darkMode === null) {
  window.localStorage.setItem('darkMode', 'false');
}
if (darkMode) {
  document.body.classList.add('dark-mode');
}
setDesktopLogoTheme(darkMode);

// Emoji
let mainEmoji = window.localStorage.getItem('mainEmoji');
if (mainEmoji === null) {
  mainEmoji = themes[theme]['mine'];
}

// Modal
window.localStorage.setItem('modalOpen', 'false');
window.localStorage.setItem('activeModal', '');

// Title
let title = themes[theme]?.title ?? 'Emoji Minesweeper';

/**
 * Elements
 */
// Game container
const gameContainer = document.createElement('div');
gameContainer.setAttribute('id', 'game-container');
document.body.appendChild(gameContainer);

// ICBL Logo
const icblLogo = ICBLLogo();
document.body.appendChild(icblLogo);
setDesktopLogoTheme(darkMode);

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
newGameButton.addEventListener('click', () => {
  closeActiveModal();
  window.emojiMinesweeper?.resetGame();
});

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
customButton.dataset.modalTarget = 'custom-modal';
emojiButtonsContainer.appendChild(customButton);

// Stats Button
const statsButton = StatsButton();
statsButton.dataset.modalTarget = 'stats-modal';
emojiButtonsContainer.appendChild(statsButton);

// Theme Button
const themeButton = ThemeButton(header);
emojiButtonsContainer.appendChild(themeButton);

// Help Button
const helpButton = HelpButton();
helpButton.dataset.modalTarget = 'help-modal';
emojiButtonsContainer.appendChild(helpButton);

// Mute Button
const muteButton = MuteButton();
emojiButtonsContainer.appendChild(muteButton);

// Dark Mode Button
const darkModeButton = DarkModeButton(darkMode);
emojiButtonsContainer.appendChild(darkModeButton);

scheduleAfterInitialRender('background-ui-assets', () => {
  preloadFont('400 26px "Mochiy Pop One"');
  preloadHelpModalAssets();
  preloadLogoAssets();
});

/**
 * Modals
 */
let activeModalId = null;
let suppressedModalToggleId = null;
window.localStorage.setItem('customModalOpen', 'false');

function setCustomModalState(modalId) {
  window.localStorage.setItem(
    'customModalOpen',
    modalId === 'custom-modal' ? 'true' : 'false'
  );
}

function openActiveModal(modalId, renderModal) {
  resetModal();
  renderModal();
  activeModalId = modalId;
  setCustomModalState(modalId);
  openModal(modalId);
}

function closeActiveModal() {
  if (activeModalId !== null) {
    activeModalId = null;
    setCustomModalState(null);
    closeModal();
  }
}

function toggleModal(modalId, renderModal) {
  if (suppressedModalToggleId === modalId) {
    suppressedModalToggleId = null;
    return;
  }

  if (activeModalId === modalId) {
    closeActiveModal();
    return;
  }

  openActiveModal(modalId, renderModal);
}

const toggleCustomModal = () => toggleModal('custom-modal', CustomModal);
const toggleStatsModal = () => {
  if (window.location.hash === '#debug') {
    showTooltip(
      statsButton,
      'Stats unavailable',
      'Debug mode does not save stats.'
    );
    return;
  }

  if (window.localStorage.getItem('level') === 'custom') {
    showTooltip(
      statsButton,
      'Stats unavailable',
      'Custom levels do not save stats.'
    );
    return;
  }

  toggleModal('stats-modal', StatsModal);
};
const toggleHelpModal = () => toggleModal('help-modal', HelpModal);

customButton.addEventListener('click', toggleCustomModal);
statsButton.addEventListener('click', toggleStatsModal);
helpButton.addEventListener('click', toggleHelpModal);

document.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closeActiveModal();
    return;
  }

  if (e.code === 'KeyS') {
    toggleStatsModal();
  }

  if (e.code === 'KeyH') {
    toggleHelpModal();
  }
});

document.addEventListener('levelChanged', () => {
  syncLevelButtons();
});

document.addEventListener('customLevelSubmitted', () => {
  closeActiveModal();
});

document.addEventListener('pointerdown', e => {
  if (window.localStorage.getItem('modalOpen') !== 'true') {
    return;
  }

  const modal = document.querySelector('.modal');
  if (modal && !modal.contains(e.target)) {
    const modalTrigger = e.target.closest('[data-modal-target]');
    if (modalTrigger?.dataset.modalTarget === activeModalId) {
      suppressedModalToggleId = activeModalId;
    }

    closeActiveModal();
  }
});

/**
 * End modal
 */
document.addEventListener('gameHasEnded', () => {
  resetModal();
  modal.id = 'end-modal';
  activeModalId = 'end-modal';
  setCustomModalState(activeModalId);
  openModal(activeModalId);

  // Display stats in modal when the game ends
  const { time, bbbv, bbbvPerSec, moves, efficinecny } =
    window.statsStore.getCurrentGameSummary();

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
    closeActiveModal();
  });
});

/**
 * Forcer
 */
let forcer = null;

function syncForcer() {
  if (window.location.hash !== '#debug') {
    forcer?.remove();
    forcer = null;
    return;
  }

  if (forcer) {
    return;
  }

  forcer = Forcer();
  gameContainer.appendChild(forcer);

  const submitButton = document.getElementById('forcer-submit');
  const input = document.getElementById('forcer-input');

  submitButton.addEventListener('click', handleForcedMinesSubmit);
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleForcedMinesSubmit();
    }
  });
}

function handleForcedMinesSubmit() {
  const input = document.getElementById('forcer-input');
  const message = document.getElementById('forcer-message');
  const mines = parseForcedMines(input.value);

  if (mines.length === 0) {
    message.textContent = 'Enter at least one valid square number.';
    return;
  }

  applyLevelForForcedMines(mines);

  if (window.emojiMinesweeper?.setForcedMines(mines)) {
    message.textContent = `Forced ${mines.length} mine${
      mines.length === 1 ? '' : 's'
    }.`;
    input.value = mines.join(', ');
    return;
  }

  message.textContent = 'Could not apply forced mines.';
}

function applyLevelForForcedMines(mines) {
  const { columns, rows } = getCurrentBoardDimensions();
  const matchingLevel = getMatchingStandardLevel({
    columns,
    rows,
    mines: mines.length,
  });

  if (matchingLevel !== null) {
    setLevel(matchingLevel);
    return;
  }

  const customLevel = window.customLevelRules.normalizeCustomLevel({
    columns,
    rows,
    mines: mines.length,
  });
  window.customLevelRules.saveCustomLevel(customLevel);
  window.emojiMinesweeper?.setLevel('custom');
  document.dispatchEvent(
    new CustomEvent('levelChanged', { detail: { level: 'custom' } })
  );
}

function parseForcedMines(value) {
  const maxSquare = getCurrentBoardSquareCount() - 1;

  return Array.from(
    new Set(
      value
        .split(/[\s,;]+/)
        .map(mine => Number.parseInt(mine, 10))
        .filter(
          mine => Number.isInteger(mine) && mine >= 0 && mine <= maxSquare
        )
    )
  );
}

function getCurrentBoardSquareCount() {
  const { columns, rows } = getCurrentBoardDimensions();

  return columns * rows;
}

function getCurrentBoardDimensions() {
  const level = window.localStorage.getItem('level') ?? 'beginner';
  const { columns, rows } = getLevelSettings(level);

  return { columns, rows };
}

syncForcer();
window.addEventListener('hashchange', syncForcer);

/**
 * Easter Egg
 */
let easterEggActivated = false;

document.addEventListener('keydown', event => {
  if (event.code === 'KeyE' && !easterEggActivated) {
    easterEggActivated = true;

    setInterval(() => {
      addEasterEgg();
    }, 1000);

    function addEasterEgg() {
      const easterEgg = document.createElement('div');
      easterEgg.classList.add('easter-egg');

      easterEgg.innerHTML = '<img src="assets/logo.svg" alt="">';
      document.body.appendChild(easterEgg);

      const imgElement = easterEgg.querySelector('img');
      setRandomAnimationProperties(imgElement);
    }

    function setRandomAnimationProperties(element) {
      element.style.setProperty('--duration', randomValue(30, 60, 's')); // Random speed
      element.style.setProperty('--start-x', randomValue(-200, -100, '%')); // Off-screen left start
      element.style.setProperty('--start-y', randomValue(0, 100, 'vh')); // Random vertical start
      element.style.setProperty('--mid1-x', randomValue(0, 50, 'vw')); // First trajectory point
      element.style.setProperty('--mid1-y', randomValue(-50, 0, 'vh'));
      element.style.setProperty('--mid2-x', randomValue(50, 100, 'vw')); // Second trajectory point
      element.style.setProperty('--mid2-y', randomValue(0, 100, 'vh'));
      element.style.setProperty('--mid3-x', randomValue(0, 100, 'vw')); // Third trajectory point
      element.style.setProperty('--mid3-y', randomValue(50, 150, 'vh'));
      element.style.setProperty('--end-x', randomValue(100, 200, '%')); // Off-screen right end
      element.style.setProperty('--end-y', randomValue(0, 100, 'vh')); // Random vertical end
    }

    function randomValue(min, max, unit = '') {
      return `${Math.random() * (max - min) + min}${unit}`;
    }
  }
});
