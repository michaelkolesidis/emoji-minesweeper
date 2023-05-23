/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 * minesweeperEmoji.js contains the game functionality,
 * everything that happens inside the game's board. It
 * also handles the update of the stats accordingly.
 */

/**
 * Basics
 */
// Disable the Friendly Error System
// (not used in the minified version of p5js)
disableFriendlyErrors = true;

// Prevent right mouse click from opening browser context menu in order to be able to flag
document.addEventListener("contextmenu", (event) => event.preventDefault());

// Canvas
let cnv; // The canvas element that will contain the game

const themes = {
  mine: {
    name: "mine",
    title: "Emoji Minesweeper",
    mine: "💣",
    detonation: "💥",
    won: "😄",
    lost: "😵",
  },
  flower: {
    name: "flower",
    title: "Emoji Flower Field",
    mine: "🌺",
    detonation: "🐛",
    won: "😊",
    lost: "😔",
  },
  mushroom: {
    name: "mushroom",
    title: "Emoji Shroom Picker",
    mine: "🍄",
    detonation: "🦄",
    won: "😎",
    lost: "😵‍💫",
  },
  bear: {
    name: "bear",
    title: "Emoji Bearspotting",
    mine: "🐻",
    detonation: "🐾",
    won: "🌳",
    lost: "🪵",
  },
  octopus: {
    name: "octopus",
    title: "Emoji Seasweeper",
    mine: "🐙",
    detonation: "🌊",
    won: "⛵️",
    lost: "🦈",
  },
  japan: {
    name: "japan",
    title: "絵文字マインスイーパー",
    mine: "🏯",
    detonation: "👺",
    won: "🌸",
    lost: "🈲",
  },
};

/**
 * Dark Mode
 */
let darkMode = JSON.parse(localStorage.getItem("darkMode")) ?? false;

/**
 * Emojis
 */
let theme = window.localStorage.getItem("theme") ?? "mine";
window.localStorage.setItem("mainEmoji", themes[theme]["mine"]);

let mineEmoji = themes[theme]["mine"];
let detonationEmoji = themes[theme]["detonation"];
let wonEmoji = themes[theme]["won"];
let lostEmoji = themes[theme]["lost"];

// Emojis
const CLOSED = darkMode ? "⬛" : "🔲";
let NUMBERS = ["⬜️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];
if (darkMode) NUMBERS[0] = "";
const FLAG = "🚩";
let DETONATION = detonationEmoji;
let MINE = mineEmoji;
const WRONG = "❌";
let WON = wonEmoji;
let LOST = lostEmoji;
const TIMER = "⌛";
const MOVES = "🧮";

/**
 * Title
 */
window.localStorage.setItem("title", themes[theme]["title"]);

/**
 * Settings
 */
let settings = {
  level: {
    // to be overridden by localStorage
    columns: 9,
    rows: 9,
    mines: 10,
  },
  size: {
    squareSize: 32,
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
let squares = []; // Array to hold all the square objects
let squareSize = settings.size.squareSize; // The size (in pixels of each square)
let columns = settings.level.columns; // The number of columns in the board
let rows = settings.level.rows; // The number of rows in the board
let numberOfSquares = rows * columns;
let sizeError = squareSize * 0.175; // On Windows and on Linux if error is not added to size,
// the left and bottom borders are not totally visible -
// on Mac it works fine even without the error

let boardSize = {
  width: squareSize * columns + sizeError,
  height: squareSize * rows + sizeError,
};

let initialMines = settings.level.mines; // Used by the mine indicator
let numberOfMines = initialMines; // Used to calculate mines to be allocated to squares
let squareCounter = 0; // The unique identifier of each square
let minedSquares = []; // A array containing the unique identifiers of all the squares that will contain mines

let flaggedSquares = 0;
let moves = 0; // total number of moves (left and right clicks on active squares)
let startTime = null; // used to calculate time
let gameFinished = false;
let newBestMoves = false; // used when the player has made a new best moves record
let newBestTime = false; // used when the player has made a new best time

/**
 * Mine allocation
 */
function allocateMines() {
  while (numberOfMines > 0) {
    let targetSquare = Math.floor(Math.random() * numberOfSquares);
    if (!minedSquares.includes(targetSquare)) {
      minedSquares.push(targetSquare);
      numberOfMines -= 1;
    }
  }
}

function generateSquares() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let newSquare = new Square(i, j);
      newSquare.num = squareCounter;
      squareCounter += 1;

      // Check whether square includes mine
      if (minedSquares.includes(newSquare.num)) {
        newSquare.mine = true;
      }
      squares.push(newSquare);
    }
  }
}

// Calculate mines around each square
function calculateMines() {
  squares.forEach((s) => {
    // Find squares touching each square
    let neighbors = getNeighbors(s);
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    s.minesAround = neighbors.map((n) => n.mine).reduce(reducer); // Add all mine values to find total
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
  darkMode ? background(25) : background(255);
  cnv = createCanvas(
    boardSize.width,
    boardSize.height + squareSize * 0.75 // Added extra space for the mines and flagged squares indicators
  );
  cnv.parent("board");
  textSize(squareSize - squareSize * 0.05); // On Mac "squareSize - 1" works better, on Windows "squareSize - 6"

  allocateMines();
  generateSquares();
  calculateMines();
}

/**
 * Draw
 */
function draw() {
  darkMode ? background(25) : background(255);

  if (navigator.userAgent.includes("Firefox")) {
    translate(squareSize / 10, 0);
  }

  translate(-squareSize * 0.075, squareSize - squareSize * 0.075);
  squares.forEach(function (s) {
    s.draw();
  });

  // Show mines and flagged squares indicators
  textSize(squareSize * 0.6);
  textStyle(BOLD);
  textFont("Arial");

  // Mine indicator
  if (flaggedSquares > initialMines) {
    fill(248, 49, 47);
  } else {
    darkMode ? fill(225) : fill(35);
  }
  text(MINE, squareSize * 0.125, boardSize.height - squareSize * 0.275);
  text(
    nf(Math.max(initialMines - flaggedSquares, 0), 3),
    squareSize,
    boardSize.height - squareSize * 0.25
  );

  // Moves indicator
  darkMode ? fill(225) : fill(35);
  text(
    MOVES,
    width / 2 - squareSize * 1.975 + squareSize * 0.99,
    boardSize.height - squareSize * 0.275
  );
  if (newBestMoves) {
    fill(255, 176, 46);
  }
  text(
    nf(moves, 3),
    width / 2 - squareSize * 1.975 + 2 * squareSize * 0.99,
    boardSize.height - squareSize * 0.275
  );

  // Time indicator
  darkMode ? fill(225) : fill(35);

  text(
    TIMER,
    width - squareSize * 1.975,
    boardSize.height - squareSize * 0.275
  );
  if (newBestTime) {
    fill(255, 176, 46);
  }
  text(
    nf(timePassed, 3),
    width - squareSize * 1.1,
    boardSize.height - squareSize * 0.25
  );
  textSize(squareSize - squareSize * 0.05);
}

// Get neighbors
function getNeighbors(square) {
  return squares.filter((n) => {
    return (
      n.i >= square.i - 1 &&
      n.i <= square.i + 1 &&
      n.j >= square.j - 1 &&
      n.j <= square.j + 1
    );
  });
}

/**
 * Mouse Action Handling
 */
let isFirstClick = true;
let mineReallocated = false;

// What happens every time the player clicks on a square
function openSquare(square) {
  // Make sure first click is not on a mine
  if (isFirstClick) {
    startTimer();
    startTime = new Date();

    // Update local storage
    if (window.location.hash === "") {
      let played;
      switch (level) {
        case "beginner":
          played = parseInt(localStorage.getItem("beginnerPlayed"));
          played += 1;
          localStorage.setItem("beginnerPlayed", played);
          break;
        case "intermediate":
          played = parseInt(localStorage.getItem("intermediatePlayed"));
          played += 1;
          localStorage.setItem("intermediatePlayed", played);
          break;
        case "expert":
          played = parseInt(localStorage.getItem("expertPlayed"));
          played += 1;
          localStorage.setItem("expertPlayed", played);
          break;
      }
    }

    if (square.mine) {
      square.mine = false;
      const originalSquareNum = square.num;

      while (!mineReallocated) {
        let num = Math.floor(Math.random() * numberOfSquares);
        if (num !== originalSquareNum) {
          if (!squares[num].mine) {
            squares[num].mine = true;
            mineReallocated = true;
          }
        }
      }
    }
    isFirstClick = false;

    calculateMines();
    squares.forEach(function (s) {
      s.draw();
    });
  }

  // Open square
  square.opened = true;
  square.clicked = true;
  if (square.mine) {
    // End game
    squares.forEach((s) => {
      s.opened = true;
    });
    noLoop();
    return;
  }
  if (square.minesAround == 0) {
    // Recursively open neighbors
    let neighbors = getNeighbors(square);
    neighbors.forEach((s) => {
      if (!s.opened) {
        openSquare(s);
        if (s.flagged) {
          s.flagged = false;
          flaggedSquares -= 1;
        }
      }
    });
  }
}

function mousePressed() {
  // Disable click if modal is open
  if (JSON.parse(localStorage.getItem("modalOpen")) === true) {
    return;
  }
  // Flags
  if (mouseButton === RIGHT || JSON.parse(localStorage.getItem("flagMode"))) {
    // Find the square the player clicked on
    let square = squares.find((s) => {
      return (
        s.x < mouseX &&
        s.x + squareSize > mouseX &&
        s.y < mouseY &&
        s.y + squareSize > mouseY
      );
    });
    if (square) {
      // Prevent opened squares from being flagged
      if (!square.opened) {
        if (!square.flagged) {
          flaggedSquares += 1;
          moves += 1;
          addMove();
        } else {
          flaggedSquares -= 1;
          moves += 1;
          addMove();
        }
        square.flagged = !square.flagged;
      }
    }
  }

  // Find the square pressed on
  if (mouseButton === LEFT && !JSON.parse(localStorage.getItem("flagMode"))) {
    if (!gameFinished) {
      let square = squares.find((s) => {
        return (
          s.x < mouseX &&
          s.x + squareSize > mouseX &&
          s.y < mouseY &&
          s.y + squareSize > mouseY
        );
      });
      if (square) {
        if (square.flagged || square.opened) {
          return; // Do not allow opening when flagged
        }
        openSquare(square);
        moves += 1;
        addMove();
        if (square.mine) {
          if (!gameFinished) {
            gameLost();
            gameEnded();
          }
        } else {
          // Check if the game has been won
          let squaresLeft = squares.filter((s) => {
            return !s.mine && !s.opened;
          }).length;
          if (squaresLeft == 0) {
            if (!gameFinished) {
              gameWon();
              gameEnded();
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
// Handle end
function gameEnded() {
  gameFinished = true;
  if (window.location.hash === "") {
    calculateWinPercentage();

    let totalTime;
    switch (level) {
      case "beginner":
        totalTime = parseInt(localStorage.getItem("beginnerTotalTime"));
        totalTime += timePassed;
        localStorage.setItem("beginnerTotalTime", totalTime);
        break;
      case "intermediate":
        totalTime = parseInt(localStorage.getItem("intermediateTotalTime"));
        totalTime += timePassed;
        localStorage.setItem("intermediateTotalTime", totalTime);
        break;
      case "expert":
        totalTime = parseInt(localStorage.getItem("expertTotalTime"));
        totalTime += timePassed;
        localStorage.setItem("expertTotalTime", totalTime);
        break;
    }
  }
}

// Handle win
function gameWon() {
  NUMBERS[0] = WON;
  squares.forEach(function (s) {
    s.opened = true;
  });

  // Update local storage
  // Won Data
  if (window.location.hash === "") {
    let won;
    switch (level) {
      case "beginner":
        won = parseInt(localStorage.getItem("beginnerWon"));
        won += 1;
        localStorage.setItem("beginnerWon", won);
        break;
      case "intermediate":
        won = parseInt(localStorage.getItem("intermediateWon"));
        won += 1;
        localStorage.setItem("intermediateWon", won);
        break;
      case "expert":
        won = parseInt(localStorage.getItem("expertWon"));
        won += 1;
        localStorage.setItem("expertWon", won);
        break;
    }

    // Moves Data
    let bestMoves;
    switch (level) {
      case "beginner":
        bestMoves = Number(localStorage.getItem("beginnerBestMoves"));
        break;
      case "intermediate":
        bestMoves = Number(localStorage.getItem("intermediateBestMoves"));
        break;
      case "expert":
        bestMoves = Number(localStorage.getItem("expertBestMoves"));
        break;
    }

    if (bestMoves === 0) {
      switch (level) {
        case "beginner":
          localStorage.setItem("beginnerBestMoves", moves);
          break;
        case "intermediate":
          localStorage.setItem("intermediateBestMoves", moves);
          break;
        case "expert":
          localStorage.setItem("expertBestMoves", moves);
          break;
      }
    } else {
      if (moves < bestMoves) {
        NUMBERS[0] = "🥳";
        newBestMoves = true;
        switch (level) {
          case "beginner":
            localStorage.setItem("beginnerBestMoves", moves);
            break;
          case "intermediate":
            localStorage.setItem("intermediateBestMoves", moves);
            break;
          case "expert":
            localStorage.setItem("expertBestMoves", moves);
            break;
        }
        localStorage.setItem("newBestMoves", "true");
      }
    }

    // Time Data
    const endTime = new Date();
    let time = (endTime - startTime) / 1000; //initially in milliseconds, divide by 1000 for seconds

    let bestTime;
    switch (level) {
      case "beginner":
        bestTime = Number(localStorage.getItem("beginnerBestTime"));
        break;
      case "intermediate":
        bestTime = Number(localStorage.getItem("intermediateBestTime"));
        break;
      case "expert":
        bestTime = Number(localStorage.getItem("expertBestTime"));
        break;
    }

    if (bestTime === 0) {
      switch (level) {
        case "beginner":
          localStorage.setItem("beginnerBestTime", time);
          break;
        case "intermediate":
          localStorage.setItem("intermediateBestTime", time);
          break;
        case "expert":
          localStorage.setItem("expertBestTime", time);
          break;
      }
    } else {
      if (time < bestTime) {
        NUMBERS[0] = "🥳";
        newBestTime = true;
        switch (level) {
          case "beginner":
            localStorage.setItem("beginnerBestTime", time);
            break;
          case "intermediate":
            localStorage.setItem("intermediateBestTime", time);
            break;
          case "expert":
            localStorage.setItem("expertBestTime", time);
            break;
        }
        localStorage.setItem("newBestTime", "true");
      }
    }
  }
  stopTimer = true;
}

// handle loss
function gameLost() {
  NUMBERS[0] = LOST;
  squares.forEach(function (s) {
    s.opened = true;
  });

  const endTime = new Date();
  let time = endTime - startTime; //in ms
  time = time / 1000;
  stopTimer = true;
}

// Add move to total moves
function addMove() {
  let totalMoves;
  switch (level) {
    case "beginner":
      totalMoves = parseInt(localStorage.getItem("beginnerTotalMoves"));
      totalMoves += 1;
      localStorage.setItem("beginnerTotalMoves", totalMoves);
      break;
    case "intermediate":
      totalMoves = parseInt(localStorage.getItem("intermediateTotalMoves"));
      totalMoves += 1;
      localStorage.setItem("intermediateTotalMoves", totalMoves);
      break;
    case "expert":
      totalMoves = parseInt(localStorage.getItem("expertTotalMoves"));
      totalMoves += 1;
      localStorage.setItem("expertTotalMoves", totalMoves);
      break;
  }
}

// Calculate percentage of wins / total games played
function calculateWinPercentage() {
  if (window.location.hash === "") {
    let played, won;
    switch (level) {
      case "beginner":
        played = parseInt(localStorage.getItem("beginnerPlayed"));
        won = parseInt(localStorage.getItem("beginnerWon"));
        break;
      case "intermediate":
        played = parseInt(localStorage.getItem("intermediatePlayed"));
        won = parseInt(localStorage.getItem("intermediateWon"));
        break;
      case "expert":
        played = parseInt(localStorage.getItem("expertPlayed"));
        won = parseInt(localStorage.getItem("expertWon"));
        break;
    }
    let winPercentage = null;

    if (played !== 0) {
      winPercentage = won / played;
    }

    if (winPercentage !== null) {
      // Update local storage
      switch (level) {
        case "beginner":
          window.localStorage.setItem("beginnerWinPercentage", winPercentage);
          break;
        case "intermediate":
          window.localStorage.setItem(
            "intermediateWinPercentage",
            winPercentage
          );
          break;
        case "expert":
          window.localStorage.setItem("expertWinPercentage", winPercentage);
          break;
      }
    }
  }
}

/**
 * Keyboard Action Handling
 */
function keyPressed() {
  // Set Level
  if (keyCode === 49 || keyCode === 97) {
    if (level !== "beginner") {
      localStorage.setItem("level", "beginner");
      window.location.reload();
    }
  }
  if (keyCode === 50 || keyCode === 98) {
    if (level !== "intermediate") {
      localStorage.setItem("level", "intermediate");
      window.location.reload();
    }
  }
  if (keyCode === 51 || keyCode === 99) {
    if (level !== "expert") {
      localStorage.setItem("level", "expert");
      window.location.reload();
    }
  }

  // New Game
  if (keyCode === 78) {
    window.location.reload();
  }
}
