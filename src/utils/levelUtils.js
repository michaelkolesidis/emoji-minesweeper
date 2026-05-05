/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export function setLevel(level) {
  const currentLevel = window.localStorage.getItem('level');
  if (currentLevel === level) {
    return;
  }

  window.emojiMinesweeper?.setLevel(level);
  document.dispatchEvent(new CustomEvent('levelChanged', { detail: { level } }));
}

export function syncLevelButtons() {
  const level = window.localStorage.getItem('level');
  document.querySelectorAll('[data-level]').forEach(button => {
    button.classList.toggle(
      'emoji-button-clicked',
      button.dataset.level === level
    );
  });
}
