/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

let closeTimerId = null;

const getModal = () => document.querySelector('.modal');

// Reset styles that modal renderers may have changed for one modal type.
export const resetModal = () => {
  const modal = getModal();

  if (window.cleanupCustomModalListeners) {
    window.cleanupCustomModalListeners();
  }

  if (window.cleanupStatsModalListeners) {
    window.cleanupStatsModalListeners();
  }

  modal.removeAttribute('id');
  modal.innerHTML = '';
  modal.style.top = '';
  modal.style.alignItems = '';
  modal.style.justifyContent = '';
};

// Open modal
export const openModal = modalId => {
  const modal = getModal();

  if (closeTimerId !== null) {
    clearTimeout(closeTimerId);
    closeTimerId = null;
  }

  modal.style.zIndex = '2';
  modal.style.opacity = '1';
  window.localStorage.setItem('modalOpen', 'true');
  window.localStorage.setItem('activeModal', modalId ?? '');
};

// Close modal
export const closeModal = () => {
  const modal = getModal();

  if (window.cleanupCustomModalListeners) {
    window.cleanupCustomModalListeners();
  }

  if (window.cleanupStatsModalListeners) {
    window.cleanupStatsModalListeners();
  }

  if (closeTimerId !== null) {
    clearTimeout(closeTimerId);
  }

  closeTimerId = setTimeout(() => {
    modal.style.zIndex = '-1';
    closeTimerId = null;
  }, 750);

  modal.style.opacity = '0';
  window.localStorage.setItem('modalOpen', 'false');
  window.localStorage.setItem('activeModal', '');
};
