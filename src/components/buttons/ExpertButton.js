/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function ExpertButton() {
  // Button
  const expertButton = document.createElement('div');
  expertButton.title = `Expert level`;
  expertButton.className = `emoji-button`;
  expertButton.innerHTML = `<img src="../../../emoji/keycap_3_flat.png" />`;
  if (level === 'expert') {
    expertButton.classList.add('emoji-button-clicked');
  }

  // Functionality
  expertButton.addEventListener('click', () => {
    if (level !== 'expert') {
      window.localStorage.setItem('level', 'expert');
      window.location.reload();
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    const customModalOpen = window.localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit3' &&
      level !== 'expert' &&
      customModalOpen !== 'true'
    ) {
      window.localStorage.setItem('level', 'expert');
      window.location.reload();
    }
  });

  return expertButton;
}
