/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function CustomButton() {
  // Button
  const customButton = document.createElement('div');
  customButton.title = `Custom level`;
  customButton.className = `emoji-button`;
  customButton.innerHTML = `<img src="../../../emoji/keycap_asterisk_flat.png" />`;
  if (level === 'custom') {
    customButton.classList.add('emoji-button-clicked');
  }

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    const customModalOpen = window.localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit4' &&
      level !== 'custom' &&
      customModalOpen !== 'true'
    ) {
      window.localStorage.setItem('level', 'custom');
      window.location.reload();
    }
  });

  return customButton;
}
