/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 *  Square.js contains the Square class with all the
 *  functionality handling what will the content
 *  of each square be.
 */

class Square {
  num;
  i;
  j;
  x; // horizontal position of the square in the canvas
  y; // vertical position of the square inside the canvas
  mine;
  minesAround;
  opened;
  clicked; // to show detonation only on the clicked mine
  flagged;

  constructor(i, j, num) {
    this.num = num;
    this.i = i;
    this.j = j;
    this.x = i * squareSize;
    this.y = j * squareSize;
    this.mine = false;
    this.minesAround = 0;
    this.opened = false;
    this.clicked = false;
    this.flagged = false;
  }

  draw() {
    if (this.opened && this.clicked && this.mine) {
      // The mine the player clicked 💥
      image(DETONATION, this.x, this.y, squareSize, squareSize);
      return;
    }

    if (this.opened && this.mine) {
      // Mine the played didn't click 💣
      image(MINE, this.x, this.y, squareSize, squareSize);
      return;
    }

    if (this.opened && this.flagged) {
      // Flagged square was not a mine ❌
      image(WRONG, this.x, this.y, squareSize, squareSize);
      return;
    }
    if (this.opened) {
      // Opened squared showing the number of mines touching the square ⬜️1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣
      image(NUMBERS[this.minesAround], this.x, this.y, squareSize, squareSize);
      return;
    }

    if (this.flagged) {
      // Flagged square 🚩
      image(FLAG, this.x, this.y, squareSize, squareSize);
      return;
    }

    // Closed square 🔲
    image(CLOSED, this.x, this.y, squareSize, squareSize);

    // Square numbers and mine locations for debugging
    if (window.location.hash === "#debug") {
      textSize(10.5);
      if (this.mine) {
        fill(255, 61, 61);
      }
      text(this.num, this.x + squareSize / 3.5, this.y + squareSize / 1.6);
      textSize(squareSize - squareSize * 0.05);
      darkMode ? fill(225) : fill(35);
    }
  }
}
