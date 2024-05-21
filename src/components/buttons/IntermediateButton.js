/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function IntermediateButton() {
  // Button
  const intermediateButton = document.createElement('div');
  intermediateButton.title = `Intermediate level`;
  intermediateButton.className = `emoji-button`;
  intermediateButton.innerHTML = `<img src="../../../emoji/keycap_2_flat.png" />`;

  if (level === 'intermediate') {
    intermediateButton.classList.add('emoji-button-clicked');
  }

  // Functionality
  intermediateButton.addEventListener('click', () => {
    if (level !== 'intermediate') {
      localStorage.setItem('level', 'intermediate');
      window.location.reload();
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    const customModalOpen = localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit2' &&
      level !== 'intermediate' &&
      customModalOpen !== 'true'
    ) {
      localStorage.setItem('level', 'intermediate');
      window.location.reload();
    }
  });

  return intermediateButton;
}
