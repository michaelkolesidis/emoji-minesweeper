/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function BeginnerButton() {
  // Button
  const beginnerButton = document.createElement('div');
  beginnerButton.title = `Beginner level`;
  beginnerButton.className = `emoji-button`;
  beginnerButton.innerHTML = `<img src="../../../emoji/keycap_1_flat.png" />`;
  if (level === 'beginner') {
    beginnerButton.classList.add('emoji-button-clicked');
  }

  // Functionality
  beginnerButton.addEventListener('click', () => {
    if (level !== 'beginner') {
      localStorage.setItem('level', 'beginner');
      window.location.reload();
    }
  });

  return beginnerButton;
}
