/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
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
    if (e.code === 'Digit4') {
      if (level !== 'custom') {
        window.localStorage.setItem('level', 'custom');
        window.location.reload();
      }
    }
  });

  return customButton;
}
