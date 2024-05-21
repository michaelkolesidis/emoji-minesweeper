/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
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
      localStorage.setItem('level', 'expert');
      window.location.reload();
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    const customModalOpen = localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit3' &&
      level !== 'expert' &&
      customModalOpen !== 'true'
    ) {
      localStorage.setItem('level', 'expert');
      window.location.reload();
    }
  });

  return expertButton;
}
