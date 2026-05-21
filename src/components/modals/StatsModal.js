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

let statsRefreshInterval = null;

function getCurrentStatsLevel() {
  let gameLevel = window.localStorage.getItem('level') ?? 'beginner';
  if (!window.statsStore.levels.includes(gameLevel)) {
    gameLevel = 'beginner';
  }

  return gameLevel;
}

function cleanupStatsModalListeners() {
  if (statsRefreshInterval !== null) {
    window.clearInterval(statsRefreshInterval);
    statsRefreshInterval = null;
  }
}

function startStatsRefresh(level, totalTimeValue) {
  cleanupStatsModalListeners();

  statsRefreshInterval = window.setInterval(() => {
    if (window.localStorage.getItem('activeModal') !== 'stats-modal') {
      cleanupStatsModalListeners();
      return;
    }

    const stats = window.statsStore.getLevelStats(level);
    totalTimeValue.textContent = formatTime(stats.totalTime);
  }, 250);
}

function renderClearConfirmation(modal) {
  cleanupStatsModalListeners();
  modal.innerHTML = '';

  const title = document.createElement('p');
  title.className = 'level';
  title.textContent = 'Clear all stats?';
  modal.appendChild(title);

  const message = document.createElement('p');
  message.className = 'stats-message';
  message.textContent =
    'This will erase every saved stat and cannot be undone.';
  modal.appendChild(message);

  const actions = document.createElement('div');
  actions.className = 'stats-actions';

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Yes';
  actions.appendChild(confirmButton);

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'No';
  actions.appendChild(cancelButton);

  modal.appendChild(actions);

  confirmButton.addEventListener('click', () => {
    window.statsStore.clear();
    renderClearedMessage(modal);
  });

  cancelButton.addEventListener('click', () => {
    StatsModal();
  });
}

function renderClearedMessage(modal) {
  cleanupStatsModalListeners();
  modal.innerHTML = '';

  const message = document.createElement('p');
  message.className = 'stats-message stats-message-cleared';
  message.textContent = 'Data cleared.';
  modal.appendChild(message);

  window.setTimeout(() => {
    if (window.localStorage.getItem('activeModal') === 'stats-modal') {
      StatsModal();
    }
  }, 1500);
}

export default function StatsModal() {
  window.cleanupStatsModalListeners = cleanupStatsModalListeners;

  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'stats-modal');
  modal.innerHTML = '';

  const gameLevel = getCurrentStatsLevel();
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
  const totalTimeValue = document.createElement('p');
  totalTimeValue.className = 'value';
  totalTimeValue.textContent = formatTime(stats.totalTime);
  statsTable.appendChild(totalTimeValue);

  const totalMovesLabel = document.createElement('p');
  totalMovesLabel.className = 'label';
  totalMovesLabel.textContent = 'Total Moves';
  statsTable.appendChild(totalMovesLabel);

  const totalMovesValue = document.createElement('p');
  totalMovesValue.className = 'value';
  totalMovesValue.textContent = displayNumber(stats.totalMoves);
  statsTable.appendChild(totalMovesValue);

  modal.appendChild(statsTable);
  startStatsRefresh(gameLevel, totalTimeValue);

  const clearDataButton = document.createElement('button');
  clearDataButton.innerHTML = `Clear`;
  modal.appendChild(clearDataButton);

  clearDataButton.addEventListener('click', () => {
    renderClearConfirmation(modal);
  });
}
