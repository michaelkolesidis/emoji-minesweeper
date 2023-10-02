/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

function formatTime(time) {
  let formattedTime, hours, minutes, seconds;

  hours = Math.floor(time / 3600);
  minutes = Math.floor((time - hours * 3600) / 60);
  seconds = time - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export default function StatsModal() {
  // Level: beginner || intermediate || expert
  let gameLevel = window.localStorage.getItem("level");
  if (gameLevel === null) {
    gameLevel = "beginner";
    window.localStorage.setItem("level", "beginner");
  }

  // Games Played
  let beginnerPlayed = window.localStorage.getItem("beginnerPlayed");
  if (beginnerPlayed === null) {
    window.localStorage.setItem("beginnerPlayed", "0");
  }

  let intermediatePlayed = window.localStorage.getItem("intermediatePlayed");
  if (intermediatePlayed === null) {
    window.localStorage.setItem("intermediatePlayed", "0");
  }

  let expertPlayed = window.localStorage.getItem("expertPlayed");
  if (expertPlayed === null) {
    window.localStorage.setItem("expertPlayed", "0");
  }

  // Games Won
  let beginnerWon = window.localStorage.getItem("beginnerWon");
  if (beginnerWon === null) {
    window.localStorage.setItem("beginnerWon", "0");
  }

  let intermediateWon = window.localStorage.getItem("intermediateWon");
  if (intermediateWon === null) {
    window.localStorage.setItem("intermediateWon", "0");
  }

  let expertWon = window.localStorage.getItem("expertWon");
  if (expertWon === null) {
    window.localStorage.setItem("expertWon", "0");
  }

  // Win Percentage
  let beginnerWinPercentage = window.localStorage.getItem(
    "beginnerWinPercentage"
  );
  if (beginnerWinPercentage === null) {
    window.localStorage.setItem("beginnerWinPercentage", "");
  }

  let intermediateWinPercentage = window.localStorage.getItem(
    "intermediateWinPercentage"
  );
  if (intermediateWinPercentage === null) {
    window.localStorage.setItem("intermediateWinPercentage", "");
  }

  let expertWinPercentage = window.localStorage.getItem("expertWinPercentage");
  if (expertWinPercentage === null) {
    window.localStorage.setItem("expertWinPercentage", "");
  }

  // Best Time
  let beginnerBestTime = window.localStorage.getItem("beginnerBestTime");
  if (beginnerBestTime === null) {
    window.localStorage.setItem("beginnerBestTime", "");
  }

  let intermediateBestTime = window.localStorage.getItem(
    "intermediateBestTime"
  );
  if (intermediateBestTime === null) {
    window.localStorage.setItem("intermediateBestTime", "");
  }

  let expertBestTime = window.localStorage.getItem("expertBestTime");
  if (expertBestTime === null) {
    window.localStorage.setItem("expertBestTime", "");
  }

  // Best Moves
  let beginnerBestMoves = window.localStorage.getItem("beginnerBestMoves");
  if (beginnerBestMoves === null) {
    window.localStorage.setItem("beginnerBestMoves", "");
  }

  let intermediateBestMoves = window.localStorage.getItem(
    "intermediateBestMoves"
  );
  if (intermediateBestMoves === null) {
    window.localStorage.setItem("intermediateBestMoves", "");
  }

  let expertBestMoves = window.localStorage.getItem("expertBestMoves");
  if (expertBestMoves === null) {
    window.localStorage.setItem("expertBestMoves", "");
  }

  // Total Time
  let beginnerTotalTime = window.localStorage.getItem("beginnerTotalTime");
  if (beginnerTotalTime === null) {
    window.localStorage.setItem("beginnerTotalTime", "0");
  }

  let intermediateTotalTime = window.localStorage.getItem(
    "intermediateTotalTime"
  );
  if (intermediateTotalTime === null) {
    window.localStorage.setItem("intermediateTotalTime", "0");
  }

  let expertTotalTime = window.localStorage.getItem("expertTotalTime");
  if (expertTotalTime === null) {
    window.localStorage.setItem("expertTotalTime", "0");
  }

  // Total Moves
  let beginnerTotalMoves = window.localStorage.getItem("beginnerTotalMoves");
  if (beginnerTotalMoves === null) {
    window.localStorage.setItem("beginnerTotalMoves", "0");
  }

  let intermediateTotalMoves = window.localStorage.getItem(
    "intermediateTotalMoves"
  );
  if (intermediateTotalMoves === null) {
    window.localStorage.setItem("intermediateTotalMoves", "0");
  }

  let expertTotalMoves = window.localStorage.getItem("expertTotalMoves");
  if (expertTotalMoves === null) {
    window.localStorage.setItem("expertTotalMoves", "0");
  }

  let won, played, winPercentage, bestTime, bestMoves, totalTime, totalMoves;

  switch (gameLevel) {
    case "beginner":
      played = beginnerPlayed;
      won = beginnerWon;
      winPercentage = beginnerWinPercentage;
      bestTime = beginnerBestTime;
      bestMoves = beginnerBestMoves;
      totalTime = beginnerTotalTime;
      totalMoves = beginnerTotalMoves;
      break;
    case "intermediate":
      played = intermediatePlayed;
      won = intermediateWon;
      winPercentage = intermediateWinPercentage;
      bestTime = intermediateBestTime;
      bestMoves = intermediateBestMoves;
      totalTime = intermediateTotalTime;
      totalMoves = intermediateTotalMoves;
      break;
    case "expert":
      played = expertPlayed;
      won = expertWon;
      winPercentage = expertWinPercentage;
      bestTime = expertBestTime;
      bestMoves = expertBestMoves;
      totalTime = expertTotalTime;
      totalMoves = expertTotalMoves;
      break;
  }

  // Modal
  const statsModal = document.createElement("div");
  statsModal.classList.add("modal");
  statsModal.setAttribute("id", "stats-modal");

  // Stats: Level
  statsModal.innerHTML += `<p class="level">${gameLevel.charAt(0).toUpperCase() + gameLevel.slice(1)
    }</p>`;

  const statsTable = document.createElement("div");
  statsTable.setAttribute("id", "stats-table");

  // Stats: Played
  statsTable.innerHTML += `<p class="label">Played</p>`;
  if (played) {
    statsTable.innerHTML += `<p class="value">${played}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">0</p>`;
  }

  // Stats: Won
  statsTable.innerHTML += `<p class="label">Won</p>`;
  if (won) {
    statsTable.innerHTML += `<p class="value">${won}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">0</p>`;
  }

  // Stats: Win percentage
  statsTable.innerHTML += `<p class="label">Win %</p>`;
  if (winPercentage) {
    statsTable.innerHTML += `<p class="value">${(winPercentage * 100).toFixed(
      2
    )}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">N/A</p>`;
  }

  // Stats: Best Time
  statsTable.innerHTML += `<p class="label">Best Time</p>`;
  if (bestTime) {
    statsTable.innerHTML += `<p class="value">${bestTime}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">N/A</p>`;
  }

  // Stats: Best Moves
  statsTable.innerHTML += `<p class="label">Best Moves</p>`;
  if (bestMoves) {
    statsTable.innerHTML += `<p class="value">${bestMoves}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">N/A</p>`;
  }

  statsTable.innerHTML += `<hr><hr>`;

  // Stats: Total Time
  statsTable.innerHTML += `<p class="label">Total Time</p>`;
  if (totalTime) {
    statsTable.innerHTML += `<p class="value">${formatTime(totalTime)}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">00:00:00</p>`;
  }

  // Stats: Total Moves
  statsTable.innerHTML += `<p class="label">Total Moves</p>`;
  if (totalMoves) {
    statsTable.innerHTML += `<p class="value">${totalMoves}</p>`;
  } else {
    statsTable.innerHTML += `<p class="value">0</p>`;
  }

  statsModal.appendChild(statsTable);

  // Stats: Clear Data Button
  const clearDataButton = document.createElement("button");
  clearDataButton.innerHTML = `Clear Data`;
  statsModal.appendChild(clearDataButton);

  // Clear Data Button Functionality
  clearDataButton.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.reload();
  });

  // Stats modal in debug mode
  if (
    window.location.hash === "#debug" ||
    window.location.hash === "#debug-simple"
  ) {
    statsModal.innerHTML = `<h3>Debug Mode<h3>`;
  }

  return statsModal;
}
