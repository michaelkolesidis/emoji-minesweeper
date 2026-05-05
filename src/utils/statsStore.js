/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

(() => {
  const LEVELS = ['beginner', 'intermediate', 'expert'];

  const statFields = {
    played: { suffix: 'Played', fallback: 0 },
    won: { suffix: 'Won', fallback: 0 },
    winPercentage: { suffix: 'WinPercentage', fallback: null },
    bestTime: { suffix: 'BestTime', fallback: null },
    bestMoves: { suffix: 'BestMoves', fallback: null },
    totalTime: { suffix: 'TotalTime', fallback: 0 },
    totalMoves: { suffix: 'TotalMoves', fallback: 0 },
  };

  const summaryFields = {
    time: '',
    bbbv: '',
    bbbvPerSec: '',
    moves: '',
    efficinecny: '',
  };

  const localStorageAdapter = {
    get(key) {
      return window.localStorage.getItem(key);
    },

    set(key, value) {
      window.localStorage.setItem(key, String(value));
    },

    remove(key) {
      window.localStorage.removeItem(key);
    },

    clear() {
      window.localStorage.clear();
    },
  };

  let adapter = localStorageAdapter;

  function keyFor(level, field) {
    return `${level}${statFields[field].suffix}`;
  }

  function isSupportedLevel(level) {
    return LEVELS.includes(level);
  }

  function readFiniteNumber(key, fallback) {
    const rawValue = adapter.get(key);
    const numberValue = Number(rawValue);

    if (rawValue === null || rawValue === '' || !Number.isFinite(numberValue)) {
      adapter.set(key, fallback ?? '');
      return fallback;
    }

    return numberValue;
  }

  function writeStat(level, field, value) {
    const fallback = statFields[field].fallback;
    const nextValue =
      value === null || value === undefined || !Number.isFinite(Number(value))
        ? fallback
        : Number(value);

    adapter.set(keyFor(level, field), nextValue ?? '');
    return nextValue;
  }

  function getLevelStats(level) {
    const normalizedLevel = isSupportedLevel(level) ? level : 'beginner';

    return Object.fromEntries(
      Object.entries(statFields).map(([field, config]) => [
        field,
        readFiniteNumber(keyFor(normalizedLevel, field), config.fallback),
      ])
    );
  }

  function getAllStats() {
    return Object.fromEntries(
      LEVELS.map(level => [level, getLevelStats(level)])
    );
  }

  function saveLevelStats(level, stats) {
    if (!isSupportedLevel(level)) {
      return getLevelStats('beginner');
    }

    const savedStats = {};
    Object.keys(statFields).forEach(field => {
      savedStats[field] = writeStat(level, field, stats[field]);
    });
    return savedStats;
  }

  function increment(level, field, amount = 1) {
    if (!isSupportedLevel(level)) {
      return 0;
    }

    const stats = getLevelStats(level);
    return writeStat(level, field, stats[field] + amount);
  }

  function recordGameStarted(level) {
    increment(level, 'played');
  }

  function recordMove(level) {
    increment(level, 'totalMoves');
  }

  function recordGameEnded(level, { won, time, moves }) {
    if (!isSupportedLevel(level)) {
      return;
    }

    const stats = getLevelStats(level);
    const nextStats = {
      ...stats,
      totalTime: stats.totalTime + Math.max(Number(time) || 0, 0),
    };

    if (won) {
      nextStats.won += 1;

      if (nextStats.bestMoves === null || moves < nextStats.bestMoves) {
        nextStats.bestMoves = moves;
      }

      if (nextStats.bestTime === null || time < nextStats.bestTime) {
        nextStats.bestTime = time;
      }
    }

    nextStats.winPercentage =
      nextStats.played > 0 ? nextStats.won / nextStats.played : null;

    saveLevelStats(level, nextStats);
  }

  function hasBestMoves(level, moves) {
    if (!isSupportedLevel(level)) {
      return false;
    }

    const { bestMoves } = getLevelStats(level);
    return bestMoves === null || moves < bestMoves;
  }

  function hasBestTime(level, time) {
    if (!isSupportedLevel(level)) {
      return false;
    }

    const { bestTime } = getLevelStats(level);
    return bestTime === null || time < bestTime;
  }

  function resetCurrentGameSummary() {
    Object.entries(summaryFields).forEach(([key, value]) => {
      adapter.set(key, value);
    });
  }

  function setCurrentGameSummary(summary) {
    Object.keys(summaryFields).forEach(key => {
      const value = summary[key] ?? summaryFields[key];
      adapter.set(key, value);
    });
  }

  function getCurrentGameSummary() {
    return Object.fromEntries(
      Object.keys(summaryFields).map(key => [key, adapter.get(key) ?? ''])
    );
  }

  function clear() {
    adapter.clear();
  }

  function setAdapter(nextAdapter) {
    adapter = {
      ...localStorageAdapter,
      ...nextAdapter,
    };
  }

  window.statsStore = Object.freeze({
    levels: [...LEVELS],
    getLevelStats,
    getAllStats,
    recordGameStarted,
    recordMove,
    recordGameEnded,
    hasBestMoves,
    hasBestTime,
    resetCurrentGameSummary,
    setCurrentGameSummary,
    getCurrentGameSummary,
    clear,
    setAdapter,
  });
})();
