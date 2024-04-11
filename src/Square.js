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
  num;
  i;
  j;
  x; // the exact position of the square inside the canvas, in the horizontal axis (in pixels)
  y; // the exact position of the square inside the canvas, in the vertical axis (in pixels)
  mine;
  minesAround;
  opened;
  clicked; // In order to show detonation only on clicked mine
  flagged;

  constructor(i, j, num) {
    this.num = num;
    this.i = i;
    this.j = j;
    this.x = i * (squareSize - 2.5) + 12;
    this.y = j * (squareSize - 2.5) + 4;
    this.mine = false;
    this.minesAround = 0;
    this.opened = false;
    this.clicked = false;
    this.flagged = false;
  }

  draw() {
    if (this.opened && this.clicked && this.mine) {
      // The mine the player clicked 💥
      image(DETONATION, this.x + 7, this.y - 20, squareSize, squareSize);
      return;
    }

    if (this.opened && this.mine) {
      // The mines the played didn't click 💣
      image(MINE, this.x + 7, this.y - 20, squareSize, squareSize);
      return;
    }

    if (this.opened && this.flagged) {
      // Flagged square was not a mine ❌
      image(WRONG, this.x + 7, this.y - 20, squareSize, squareSize);
      return;
    }
    if (this.opened) {
      // Calculate the number of mines touching the square ⬜️1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣
      image(
        NUMBERS[this.minesAround],
        this.x + 7,
        this.y - 20,
        squareSize,
        squareSize
      );
      return;
    }

    if (this.flagged) {
      // Flagged square 🚩
      image(FLAG, this.x + 7, this.y - 20, squareSize, squareSize);
      return;
    }

    // Closed square 🔲
    image(CLOSED, this.x + 7, this.y - 20, squareSize, squareSize);

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
