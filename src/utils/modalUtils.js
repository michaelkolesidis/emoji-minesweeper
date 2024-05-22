/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

// Open modal
export const openModal = () => {
  const modal = document.querySelector('.modal');

  modal.style.zIndex = '2';
  modal.style.opacity = '1';
  window.localStorage.setItem('modalOpen', 'true');
};

// Close modal
export const closeModal = () => {
  const modal = document.querySelector('.modal');

  setTimeout(() => {
    modal.style.zIndex = '-1';
  }, 750);
  modal.style.opacity = '0';
  window.localStorage.setItem('modalOpen', 'false');
};
