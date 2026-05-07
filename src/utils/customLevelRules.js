/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

(() => {
  const DEFAULTS = Object.freeze({
    columns: 9,
    rows: 9,
    mines: 10,
  });

  const LIMITS = Object.freeze({
    columns: { min: 7, max: 100 },
    rows: { min: 7, max: 100 },
  });

  function clampInteger(value, fallback, min, max) {
    const integer = Number.parseInt(value, 10);
    const nextValue = Number.isInteger(integer) ? integer : fallback;

    return Math.min(Math.max(nextValue, min), max);
  }

  function getMinimumMines(columns, rows) {
    return Math.ceil(columns * rows * 0.1);
  }

  function normalizeCustomLevel(candidateLevel = {}) {
    const columns = clampInteger(
      candidateLevel.columns,
      DEFAULTS.columns,
      LIMITS.columns.min,
      LIMITS.columns.max
    );
    const rows = clampInteger(
      candidateLevel.rows,
      DEFAULTS.rows,
      LIMITS.rows.min,
      LIMITS.rows.max
    );
    const minimumMines = getMinimumMines(columns, rows);
    const maximumMines = columns * rows - 1;
    const mines = clampInteger(
      candidateLevel.mines,
      DEFAULTS.mines,
      minimumMines,
      maximumMines
    );

    return {
      columns,
      rows,
      mines,
      minimumMines,
      maximumMines,
    };
  }

  function readCustomLevel(storage = window.localStorage) {
    return normalizeCustomLevel({
      columns: storage.getItem('columns'),
      rows: storage.getItem('rows'),
      mines: storage.getItem('mines'),
    });
  }

  function saveCustomLevel(level, storage = window.localStorage) {
    storage.setItem('columns', level.columns);
    storage.setItem('rows', level.rows);
    storage.setItem('mines', level.mines);
  }

  window.customLevelRules = Object.freeze({
    defaults: DEFAULTS,
    limits: LIMITS,
    getMinimumMines,
    normalizeCustomLevel,
    readCustomLevel,
    saveCustomLevel,
  });
})();
