/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function StatsButton() {
  // Button
  const statsButton = document.createElement("button");
  statsButton.setAttribute("id", "stats-button");
  statsButton.innerHTML = `Stats`;

  // As emoji button
  // const statsButton = document.createElement("div");
  // statsButton.className = `emoji-button`;
  // statsButton.innerHTML = `🥇`;

  // Functionality
  // In main.js

  return statsButton;
}
