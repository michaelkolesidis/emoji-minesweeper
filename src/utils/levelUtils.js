/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export const STANDARD_LEVELS = Object.freeze([
  Object.freeze({ level: 'beginner', columns: 9, rows: 9, mines: 10 }),
  Object.freeze({ level: 'intermediate', columns: 16, rows: 16, mines: 40 }),
  Object.freeze({ level: 'expert', columns: 30, rows: 16, mines: 99 }),
]);

const SUPPORTED_LEVELS = Object.freeze([
  ...STANDARD_LEVELS.map(({ level }) => level),
  'custom',
]);

export function getCurrentLevel() {
  const level = window.localStorage.getItem('level');

  if (SUPPORTED_LEVELS.includes(level)) {
    return level;
  }

  window.localStorage.setItem('level', 'beginner');
  return 'beginner';
}

export function setLevel(level) {
  const currentLevel = getCurrentLevel();
  if (currentLevel === level) {
    return;
  }

  window.emojiMinesweeper?.setLevel(level);
  document.dispatchEvent(
    new CustomEvent('levelChanged', { detail: { level } })
  );
}

export function getMatchingStandardLevel({ columns, rows, mines }) {
  const match = STANDARD_LEVELS.find(
    standardLevel =>
      standardLevel.columns === columns &&
      standardLevel.rows === rows &&
      standardLevel.mines === mines
  );

  return match?.level ?? null;
}

export function getLevelSettings(level) {
  const standardLevel = STANDARD_LEVELS.find(
    candidateLevel => candidateLevel.level === level
  );

  if (standardLevel) {
    return {
      columns: standardLevel.columns,
      rows: standardLevel.rows,
      mines: standardLevel.mines,
    };
  }

  return window.customLevelRules.readCustomLevel();
}

export function shouldIgnoreLevelShortcut(event) {
  const target = event.target;

  return (
    window.location.hash === '#debug' ||
    window.emojiMinesweeper?.isKeyboardMode?.() === true ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target?.isContentEditable
  );
}

export function syncLevelButtons() {
  const level = getCurrentLevel();
  document.querySelectorAll('[data-level]').forEach(button => {
    button.classList.toggle(
      'emoji-button-clicked',
      button.dataset.level === level
    );
  });
}
