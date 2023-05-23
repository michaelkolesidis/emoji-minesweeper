/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
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
      // The mine the player opened
      text(DETONATION, this.x, this.y); // 💥 or according to theme
      return;
    }
    if (this.opened && this.mine) {
      // The mines the played didn't open
      text(MINE, this.x, this.y); // 💣 or according to theme
      return;
    }
    if (this.opened && this.flagged) {
      // Flagged square was not a mine
      text(WRONG, this.x, this.y); // ❌
      return;
    }
    if (this.opened) {
      // Calculate the number of mines touching the square
      text(NUMBERS[this.minesAround], this.x, this.y); // ⬜️1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣
      return;
    }
    if (this.flagged) {
      // Flagged squares
      text(FLAG, this.x, this.y); // 🚩
      return;
    }
    // Empty squares
    text(CLOSED, this.x, this.y); // ⬜️

    // Square numbers and mine locations for debugging
    if (window.location.hash === "#debug") {
      textSize(10.5);
      if (this.mine) {
        fill(255, 61, 61);
      }
      text(this.num, this.x + squareSize / 2.5, this.y - squareSize / 6);
      textSize(squareSize - squareSize * 0.05);
      darkMode ? fill(225) : fill(35);
    }

    // Mine locations for debugging
    if (window.location.hash === "#debug-simple") {
      textSize(10.5);
      if (this.mine) {
        fill(255, 61, 61);
        text("🔴", this.x + squareSize / 2.5, this.y - squareSize / 6);
      }
      textSize(squareSize - squareSize * 0.05);
      darkMode ? fill(225) : fill(35);
    }
  }
}
