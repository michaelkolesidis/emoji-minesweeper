/*
 *  Emoji Minesweeper
 *  Copyright (c) 2022 Michael Kolesidis
 *  GNU General Public License v3.0
 *
 * Square.js contains the Square class with all the
 * functionality handling what will the content
 * of each square be.
 */

// Disable the Friendly Error System
// (not used in the minified version of p5js)
disableFriendlyErrors = true;

class Square {
  constructor(i, j) {
    this.num;
    this.i = i;
    this.j = j;
    this.x = i * squareSize; // the exact position of the square inside the canvas, in the horizontal axis (in pixels)
    this.y = j * squareSize; // the exact position of the square inside the canvas, in the vertical axis (in pixels)
    this.mine = false;
    this.minesAround = 0;
    this.opened = false;
    this.clicked = false; // In order to show detonation only on clicked mine
    this.flagged = false;
  }

  draw() {
    if (this.opened && this.clicked && this.mine) {
      text(DETONATION, this.x, this.y);
      return;
    }
    if (this.opened && this.mine) {
      text(MINE, this.x, this.y);
      return;
    }
    if (this.opened && this.flagged) {
      text(WRONG, this.x, this.y);
      return;
    }
    if (this.opened) {
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
