/*
 *  Minesweeper Emoji
 *  Copyright (c) 2022 Michael Kolesidis
 *  GNU General Public License v3.0
 *
 * minesweeperEmoji.js contains the game functionality,
 * everything that happens inside the game's board. It
 * also handles the update of the stats accordingly.
 */

/**
 * Bacis
 */
// Disable the Friendly Error System
// (not used in the minified version of p5js)
disableFriendlyErrors = true;

// Prevent right mouse click from opening browser context menu in order to be able to flag
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Canvas
let cnv; // The canvas element that will contain the game

/**
 * Emojis
 */
// Flower Mode
let flowerMode = JSON.parse(localStorage.getItem("flower"));

// Emojis
const EMPTY = "🔲";
const NUMBERS = ["⬜️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
const FLAG = "🚩";
const DETONATION = flowerMode ? "🐛" : "💥";
const MINE = flowerMode ? "🌺" : "💣";
const WRONG = "❌";
const WON = flowerMode ? "😊" : "😄";
const LOST = flowerMode ? "😔" : "😵";
const TIMER = "⌛";

/**
 * Settings
 */
let settings = {
  level: {
    // to be overriden by localStorage
    columns: 9,
    rows: 9,
    mines: 10,
  },
  size: {
    cellWidth: 32,
    cellHeight: 32,
  },
};

/**
 * Level
 */
let level = localStorage.getItem("level");

switch (level) {
  case "beginner":
    settings.level = {
      columns: 9,
      rows: 9,
      mines: 10,
    };
    break;
  case "intermediate":
    settings.level = {
      columns: 16,
      rows: 16,
      mines: 40,
    };
    break;
  case "expert":
    settings.level = {
      columns: 30,
      rows: 16,
      mines: 99,
    };
    break;
  case "custom":
    settings.level = {
      columns: null,
      rows: null,
      mines: null,
    };
    break;
}

/**
 * Board dimensions and number of mines
 */
let cells = []; // Array to hold all the cell objects
let cellWidth = settings.size.cellWidth; // The width (in pixels) of each individual cell
let cellHeight = settings.size.cellHeight; // The height (in pixels) of each individual cell
let columns = settings.level.columns; // The number of columns in the board
let rows = settings.level.rows; // The number of rows in the board
let numberOfCells = rows * columns;
let sizeError = 7; // On Windows and on Linux if error is not added to size,
// the left and bottom borders are not totally visible -
// on Mac it works fine even without the error

let boardSize = {
  width: cellWidth * columns + sizeError,
  height: cellHeight * rows + sizeError,
};

let initialMines = settings.level.mines; // Used by the mine indicator
let numberOfMines = initialMines; // Used to calculate mines to be allocated to cells
let cellCounter = 0; // The unique identifier of each cell
let minedCells = []; // A array containing the unique identifiers of all the cells that will contain mines

let flaggedCells = 0;
let startTime = null; // used to calculate time
let gameFinished = false;
let newBestTime = false; // used when the player has made a new best time

/**
 * Mine allocation
 */
function allocateMines() {
  while (numberOfMines > 0) {
    let targetCell = Math.floor(Math.random() * (numberOfCells - 1)) + 1;
    if (!minedCells.includes(targetCell)) {
      minedCells.push(targetCell);
      numberOfMines -= 1;
    }
  }
}

function generateCells() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let newCell = new Cell(i, j);
      newCell.num = cellCounter;
      cellCounter += 1;

      // Check whether cell includes mine
      if (minedCells.includes(newCell.num)) {
        newCell.mine = true;
      }

      cells.push(newCell);
    }
  }
}

// Calculate mines around each cell
function calculateMines() {
  cells.forEach((c) => {
    // Find neighboring cells
    let neighbors = getNeighbors(c);
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    c.minesAround = neighbors.map((n) => n.mine).reduce(reducer); // Add all mine values to find total
  });
}

// Time indicator
let timePassed = 0;
let stopTimer = false;

const startTimer = () => {
  setInterval(() => {
    if (stopTimer) {
      return;
    }
    timePassed += 1;
  }, 1000);
};

/**
 * Setup
 */
function setup() {
  background(249, 249, 249);
  cnv = createCanvas(
    boardSize.width,
    boardSize.height + 30 // Added 30 pixels to create space for the mines and flagged cells indicators
  );
  cnv.parent("board");
  textSize(cellHeight - 2); // On Mac "cellHeight - 1" works better, on Windows "cellHeight - 6"

  allocateMines();
  generateCells();
  calculateMines();
}

/**
 * Draw
 */
function draw() {
  background(255);

  translate(-3, cellHeight - 3);
  cells.forEach(function (c) {
    c.draw();
  });

  // Show mines and flagged cells indicators
  textSize(24);
  textStyle(BOLD);
  textFont("Arial");

  // Mine indicator
  if (flaggedCells > initialMines) {
    fill(248, 49, 47);
  } else {
    fill(35, 35, 35);
  }
  text(MINE, 5, boardSize.height - 11);
  text(
    nf(Math.max(initialMines - flaggedCells, 0), 3),
    40,
    boardSize.height - 10
  );

  // Time indicator
  fill(35, 35, 35);
  text(TIMER, width - 79, boardSize.height - 11);
  if (newBestTime) {
    fill(255, 176, 46);
  }
  text(nf(timePassed, 3), width - 44, boardSize.height - 10);
  textSize(cellHeight - 2);
}

// Get neighbors
function getNeighbors(cell) {
  return cells.filter((n) => {
    return (
      n.i >= cell.i - 1 &&
      n.i <= cell.i + 1 &&
      n.j >= cell.j - 1 &&
      n.j <= cell.j + 1
    );
  });
}

/**
 * Mouse Action Handling
 */
let isFirstClick = true;
let mineReallocated = false;

// What happens every time the player clicks on a cell
function revealCell(cell) {
  // Make sure first click is not on a mine
  if (isFirstClick) {
    startTimer();
    startTime = new Date();

    // Update local storage
    let played = parseInt(localStorage.getItem("played"));
    localStorage.setItem("played", ++played);

    if (cell.mine) {
      cell.mine = false;

      while (!mineReallocated) {
        let num = Math.floor(Math.random() * (numberOfCells - 1)) + 1;
        if (!cells[num].mine) {
          cells[num].mine = true;
          mineReallocated = true;
        }
      }
    }
    isFirstClick = false;

    calculateMines();
    cells.forEach(function (c) {
      c.draw();
    });
  }

  // Reveal cell
  cell.revealed = true;
  cell.clicked = true;
  if (cell.mine) {
    // End game
    cells.forEach((c) => {
      c.revealed = true;
    });
    noLoop();
    return;
  }
  if (cell.minesAround == 0) {
    // Recursively reveal neighbors
    let neighbors = getNeighbors(cell);
    neighbors.forEach((c) => {
      if (!c.revealed) {
        revealCell(c);
        if (c.flagged) {
          c.flagged = false;
          flaggedCells -= 1;
        }
      }
    });
  }
}

function mousePressed() {
  // Flags
  if (mouseButton === RIGHT) {
    // Find the cell pressed on
    let cell = cells.find((c) => {
      return (
        c.x < mouseX &&
        c.x + cellWidth > mouseX &&
        c.y < mouseY &&
        c.y + cellHeight > mouseY
      );
    });
    if (cell) {
      // Prevent revealed cells from being flagged
      if (!cell.revealed) {
        if (!cell.flagged) {
          flaggedCells += 1;
        } else {
          flaggedCells -= 1;
        }
        cell.flagged = !cell.flagged;
      }
    }
  }

  // Find the cell pressed on
  if (mouseButton === LEFT) {
    if (!gameFinished) {
      let cell = cells.find((c) => {
        return (
          c.x < mouseX &&
          c.x + cellWidth > mouseX &&
          c.y < mouseY &&
          c.y + cellHeight > mouseY
        );
      });
      if (cell) {
        if (cell.flagged) {
          return; // Do not allow revealing when flagged
        }
        revealCell(cell);
        if (cell.mine) {
          if (!gameFinished) {
            gameLost();
            gameFinished = true;
            calculateWinPercentage();
          }
        } else {
          // Check if game is won
          let cellsLeft = cells.filter((c) => {
            return !c.mine && !c.revealed;
          }).length;
          if (cellsLeft == 0) {
            if (!gameFinished) {
              gameWon();
              gameFinished = true;
              calculateWinPercentage();
            }
          }
        }
      }
    }
  }
}

/**
 * Endgame
 */
// Handle win
function gameWon() {
  NUMBERS[0] = WON;
  cells.forEach(function (c) {
    c.revealed = true;
  });

  // Update local storage
  let won = parseInt(localStorage.getItem("won"));
  localStorage.setItem("won", ++won);

  const endTime = new Date();
  let time = endTime - startTime; //in ms
  time = time / 1000;

  let bestTime = Number(localStorage.getItem("bestTime"));
  if (bestTime === 0) {
    localStorage.setItem("bestTime", time);
  } else {
    if (time < bestTime) {
      NUMBERS[0] = "🥳";
      newBestTime = true;
      localStorage.setItem("bestTime", time);
      localStorage.setItem("newBestTime", "true");
    }
  }
  stopTimer = true;
}

// handle loss
function gameLost() {
  NUMBERS[0] = LOST;
  cells.forEach(function (c) {
    c.revealed = true;
  });

  const endTime = new Date();
  let time = endTime - startTime; //in ms
  time = time / 1000;
  stopTimer = true;
}

// Calculate percentage of wins / total games played
function calculateWinPercentage() {
  let played = parseInt(window.localStorage.getItem("played"));
  let won = parseInt(window.localStorage.getItem("won"));
  let winPercentage = null;

  if (played !== 0) {
    winPercentage = won / played;
  }

  if (winPercentage !== null) {
    // Update local storage
    window.localStorage.setItem("winPercentage", winPercentage);
  }
}

/**
 * Keyboard Action Handling
 */
function keyPressed() {
  // Set Mode
  if (keyCode === LEFT_ARROW) {
    if (flowerMode !== true) {
      localStorage.setItem("flower", "true");
      window.location.reload();
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (flowerMode !== false) {
      localStorage.setItem("flower", "false");
      window.location.reload();
    }
  }

  // Set Level
  if (keyCode === 49) {
    if (level !== "beginner") {
      localStorage.setItem("level", "beginner");
      window.location.reload();
    }
  }
  if (keyCode === 50) {
    if (level !== "intermediate") {
      localStorage.setItem("level", "intermediate");
      window.location.reload();
    }
  }
  if (keyCode === 51) {
    if (level !== "expert") {
      localStorage.setItem("level", "expert");
      window.location.reload();
    }
  }
}
