/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function Board() {
  const board = document.createElement('div');
  board.setAttribute('id', 'board');
  const level = window.localStorage.getItem('level');
  const squareSize = 33;
  const beginnerHeight = 328;

  const heightForRows = rows => beginnerHeight + (rows - 9) * squareSize;

  switch (level) {
    case 'beginner':
      board.style.height = `${heightForRows(9)}px`;
      break;
    case 'intermediate':
      board.style.height = `${heightForRows(16)}px`;
      break;
    case 'expert':
      board.style.height = `${heightForRows(16)}px`;
      break;
    case 'custom': {
      const rows = parseInt(window.localStorage.getItem('rows'), 10);
      board.style.height = `${heightForRows(
        Number.isInteger(rows) ? rows : 9
      )}px`;
      break;
    }
    default:
      board.style.height = `${heightForRows(9)}px`;
  }

  return board;
}
