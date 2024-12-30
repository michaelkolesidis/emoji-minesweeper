/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function HelpButton() {
  // Button
  const helpButton = document.createElement('div');
  helpButton.title = `Toggle help modal`;
  helpButton.className = `emoji-button`;
  helpButton.innerHTML = `<img src="../../../emoji/white_question_mark_flat.png" />`;

  // Functionality
  // In main.js

  return helpButton;
}
