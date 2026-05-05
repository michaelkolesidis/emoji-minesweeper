/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

import { setLevel } from '../../utils/levelUtils.js';

export default function BeginnerButton() {
  // Button
  const beginnerButton = document.createElement('div');
  beginnerButton.title = `Beginner level`;
  beginnerButton.className = `emoji-button`;
  beginnerButton.dataset.level = 'beginner';
  beginnerButton.innerHTML = `<img src="emoji/keycap_1_flat.png" />`;
  const level = window.localStorage.getItem('level');

  if (level === 'beginner') {
    beginnerButton.classList.add('emoji-button-clicked');
  }

  // Functionality
  beginnerButton.addEventListener('click', () => {
    const level = window.localStorage.getItem('level');

    if (level !== 'beginner') {
      setLevel('beginner');
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    const level = window.localStorage.getItem('level');
    const modalOpen = window.localStorage.getItem('modalOpen');
    if (
      e.code === 'Digit1' &&
      level !== 'beginner' &&
      modalOpen !== 'true'
    ) {
      setLevel('beginner');
    }
  });

  return beginnerButton;
}
