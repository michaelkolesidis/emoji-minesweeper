/*
 *  Minesweeper Emoji
 *  Copyright (c) 2022 Michael Kolesidis
 *  GNU General Public License v3.0
 *
 * Cell.js contains the Cell class with all the
 * functionality handling what will the content
 * of each cell be.
 */

// Disable the Friendly Error System
// (not used in the minified version of p5js)
disableFriendlyErrors = true;

class Cell {
  constructor(i, j) {
    this.num;
    this.i = i;
    this.j = j;
    this.x = i * cellSize; // the exact position of the cell inside the canvas, in the horizontal axis (in pixels)
    this.y = j * cellSize; // the exact position of the cell inside the canvas, in the vertical axis (in pixels)
    this.mine = false;
    this.minesAround = 0;
    this.revealed = false;
    this.clicked = false; // In order to show detonation only on clicked mine
    this.flagged = false;
  }

  draw() {
    if (this.revealed && this.clicked && this.mine) {
      text(DETONATION, this.x, this.y);
      return;
    }
    if (this.revealed && this.mine) {
      text(MINE, this.x, this.y);
      return;
    }
    if (this.revealed && this.flagged) {
      text(WRONG, this.x, this.y);
      return;
    }
    if (this.revealed) {
      // Calculate the number of mines around and draw that
      text(NUMBERS[this.minesAround], this.x, this.y);
      return;
    }
    if (this.flagged) {
      text(FLAG, this.x, this.y);
      return;
    }

    text(EMPTY, this.x, this.y);
  }
}
