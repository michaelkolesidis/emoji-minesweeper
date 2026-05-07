/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(Math.floor(Number(totalSeconds) || 0), 0);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds - hours * 3600) / 60);
  const seconds = safeSeconds - hours * 3600 - minutes * 60;

  return [hours, minutes, seconds]
    .map(value => String(value).padStart(2, '0'))
    .join(':');
}

function displayNumber(value, fallback = '0') {
  return Number.isFinite(value) ? String(value) : fallback;
}

function displayDecimal(value, fallback = 'N/A') {
  return Number.isFinite(value) ? value.toFixed(2) : fallback;
}

export default function StatsModal() {
  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'stats-modal');
  modal.innerHTML = '';

  if (window.localStorage.getItem('level') === 'custom') {
    modal.innerHTML = `<h3 id="stats-not-available">Stats not available for custom levels</h3>`;
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.top = '-247px';
    return;
  }

  if (window.location.hash === '#debug') {
    modal.innerHTML = `<h3 id="stats-not-available">Debug mode</h3>`;
    return;
  }

  let gameLevel = window.localStorage.getItem('level') ?? 'beginner';
  if (!window.statsStore.levels.includes(gameLevel)) {
    gameLevel = 'beginner';
    window.localStorage.setItem('level', gameLevel);
  }

  const stats = window.statsStore.getLevelStats(gameLevel);

  modal.innerHTML += `<p class="level">${
    gameLevel.charAt(0).toUpperCase() + gameLevel.slice(1)
  }</p>`;

  const statsTable = document.createElement('div');
  statsTable.setAttribute('id', 'stats-table');

  statsTable.innerHTML += `<p class="label">Played</p>`;
  statsTable.innerHTML += `<p class="value">${displayNumber(stats.played)}</p>`;

  statsTable.innerHTML += `<p class="label">Won</p>`;
  statsTable.innerHTML += `<p class="value">${displayNumber(stats.won)}</p>`;

  statsTable.innerHTML += `<p class="label">Win %</p>`;
  statsTable.innerHTML += `<p class="value">${displayDecimal(
    stats.winPercentage === null ? null : stats.winPercentage * 100
  )}</p>`;

  statsTable.innerHTML += `<p class="label">Best Time</p>`;
  statsTable.innerHTML += `<p class="value">${
    stats.bestTime === null ? 'N/A' : displayDecimal(stats.bestTime)
  }</p>`;

  statsTable.innerHTML += `<p class="label">Best Moves</p>`;
  statsTable.innerHTML += `<p class="value">${
    stats.bestMoves === null ? 'N/A' : displayNumber(stats.bestMoves)
  }</p>`;

  statsTable.innerHTML += `<hr><hr>`;

  statsTable.innerHTML += `<p class="label">Total Time</p>`;
  statsTable.innerHTML += `<p class="value">${formatTime(stats.totalTime)}</p>`;

  statsTable.innerHTML += `<p class="label">Total Moves</p>`;
  statsTable.innerHTML += `<p class="value">${displayNumber(
    stats.totalMoves
  )}</p>`;

  modal.appendChild(statsTable);

  const clearDataButton = document.createElement('button');
  clearDataButton.innerHTML = `Clear`;
  modal.appendChild(clearDataButton);

  clearDataButton.addEventListener('click', () => {
    window.statsStore.clear();
    StatsModal();
  });
}
