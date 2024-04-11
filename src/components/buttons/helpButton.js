/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function HelpButton() {
  // Button
  const helpButton = document.createElement("div");
  helpButton.title = `Toggle help modal`;
  helpButton.className = `emoji-button`;
  helpButton.innerHTML = `<img src="../../../emoji/white_question_mark_flat.svg" />`;

  // Functionality
  // In main.js

  return helpButton;
}
