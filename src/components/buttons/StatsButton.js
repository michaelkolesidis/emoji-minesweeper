/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 */

export default function StatsButton() {
  // Button
  const statsButton = document.createElement('div');
  statsButton.title = `Stats`;
  statsButton.className = `emoji-button`;
  statsButton.innerHTML = `<img src="../../../emoji/svg/bar_chart_flat.svg" />`;

  // Functionality
  // In main.js

  return statsButton;
}
