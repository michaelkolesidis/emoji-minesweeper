/*
 *  Minesweeper Emoji
 *  Copyright (c) 2022 Michael Kolesidis
 *  GNU General Public License v3.0
 *
 */

disableFriendlyErrors = true;

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i * cellW;
    this.y = j * cellH;
    this.mine = false;
    this.minesAround = 0;
    this.revealed = false;
    this.clicked = false; // In order to show detonation only on clicked mine
    this.won = false;
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
    if (this.revealed) {
      // Calculate the number of mines around and draw that
      text(DIGITS[this.minesAround], this.x, this.y);
      return;
    }
    if (this.flagged) {
      text(FLAG, this.x, this.y);
      return;
    }

    text(EMPTY, this.x, this.y);
  }
}
