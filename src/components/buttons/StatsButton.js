/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function StatsButton() {
  // Button
  const statsButton = document.createElement('div');
  statsButton.title = `Stats`;
  statsButton.setAttribute('aria-label', 'Stats');
  statsButton.className = `emoji-button`;
  statsButton.innerHTML = `<img src="emoji/svg/bar_chart_flat.svg" alt="Stats" />`;
  // The click functionality is handled in main.js
  return statsButton;
}
