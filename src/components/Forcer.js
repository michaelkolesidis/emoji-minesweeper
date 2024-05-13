/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function Forcer() {
  const forcer = document.createElement('div');
  forcer.id = `forcer`;
  forcer.classList.add('forcer');

  forcer.innerHTML += `<p id="forcer-title">Forcer</p>
  <input type="text" id="forcer-input" placeholder="Mine positions">
  <button id="forcer-submit" >Submit</button>
  `;

  return forcer;
}
