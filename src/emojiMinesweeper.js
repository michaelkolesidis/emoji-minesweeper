/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  minesweeperEmoji.js contains the game functionality,
 *  everything that happens inside the game's board. It
 *  also handles the update of the stats accordingly.
 */

// Prevent right mouse click from opening browser context menu in order to be able to flag
document.addEventListener('contextmenu', event => event.preventDefault());

// Canvas
let cnv; // The canvas element that will contain the game

// Reset end of game stats
window.localStorage.setItem('time', '');
window.localStorage.setItem('bbbv', '');
window.localStorage.setItem('bbbvPerSec', '');
window.localStorage.setItem('moves', '');
window.localStorage.setItem('efficinecny', '');

/**
 * Dark Mode
 */
let darkMode = JSON.parse(window.localStorage.getItem('darkMode')) ?? false;

/**
 * Emoji
 */
let theme = window.localStorage.getItem('theme') ?? 'mine';
window.localStorage.setItem('mainEmoji', themes[theme]['mine']);

// Emoji images
let CLOSED;
let NUMBERS = [];
let FLAG;
let WRONG;
let TIMER;
let MOVES;
let BEST;
let WON;
let LOST;
let MINE;
let DETONATION;

// Font
let font;

// Time
let time;

function preload() {
  CLOSED = darkMode
    ? loadImage(darkTheme.closed)
    : loadImage('../emoji/black_square_button_flat.png');
  NUMBERS[0] = darkMode
    ? loadImage(darkTheme.empty)
    : loadImage('../emoji/white_large_square_flat.png');
  NUMBERS[1] = loadImage('../emoji/keycap_1_flat.png');
  NUMBERS[2] = loadImage('../emoji/keycap_2_flat.png');
  NUMBERS[3] = loadImage('../emoji/keycap_3_flat.png');
  NUMBERS[4] = loadImage('../emoji/keycap_4_flat.png');
  NUMBERS[5] = loadImage('../emoji/keycap_5_flat.png');
  NUMBERS[6] = loadImage('../emoji/keycap_6_flat.png');
  NUMBERS[7] = loadImage('../emoji/keycap_7_flat.png');
  NUMBERS[8] = loadImage('../emoji/keycap_8_flat.png');
  NUMBERS[9] = loadImage('../emoji/keycap_9_flat.png');
  FLAG = loadImage('../emoji/triangular_flag_flat.png');
  WRONG = loadImage('../emoji/cross_mark_flat.png');
  TIMER = loadImage('../emoji/hourglass_done_flat.png');
  MOVES = loadImage('../emoji/abacus_flat.png');
  BEST = loadImage('../emoji/partying_face_flat.png');
  WON = loadImage(themes[theme]['won']);
  LOST = loadImage(themes[theme]['lost']);
  MINE = loadImage(themes[theme]['mine']);
  DETONATION = loadImage(themes[theme]['detonation']);

  font = loadFont('../fonts/Nunito-Black.ttf');
}

/**
 * Title
 */
window.localStorage.setItem('title', themes[theme]['title']);

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
    squareSize: 33,
  },
};

/**
 * Level
 */
let level = window.localStorage.getItem('level');

if (
  level !== 'beginner' &&
  level !== 'intermediate' &&
  level !== 'expert' &&
  level !== 'custom'
) {
  window.localStorage.setItem('level', 'beginner');
}

switch (level) {
  case 'beginner':
    settings.level = {
      columns: 9,
      rows: 9,
      mines: 10,
    };
    break;
  case 'intermediate':
    settings.level = {
      columns: 16,
      rows: 16,
      mines: 40,
    };
    break;
  case 'expert':
    settings.level = {
      columns: 30,
      rows: 16,
      mines: 99,
    };
    break;
  case 'custom':
    let columns = parseInt(window.localStorage.getItem('columns'), 10);
    let rows = parseInt(window.localStorage.getItem('rows'), 10);
    let mines = parseInt(window.localStorage.getItem('mines'), 10);

    if (isNaN(columns)) {
      columns = 9;
      window.localStorage.setItem('columns', columns);
    } else {
      if (columns < 7) {
        columns = 7;
        window.localStorage.setItem('columns', columns);
      } else if (columns > 100) {
        columns = 100;
        window.localStorage.setItem('columns', columns);
      }
    }

    if (isNaN(rows)) {
      rows = 9;
      window.localStorage.setItem('rows', rows);
    } else {
      if (rows < 7) {
        rows = 7;
        window.localStorage.setItem('rows', rows);
      } else if (rows > 100) {
        rows = 100;
        window.localStorage.setItem('rows', rows);
      }
    }

    if (isNaN(mines)) {
      mines = 10;
      window.localStorage.setItem('mines', mines);
    } else {
      if (mines < 1) {
        mines = 1;
        window.localStorage.setItem('mines', mines);
      }
      if (mines > columns * rows - 1) {
        mines = columns * rows - 1;
        window.localStorage.setItem('mines', mines);
      }
    }

    settings.level = {
      columns,
      rows,
      mines,
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

let boardSize = {
  width: 33 * 9,
  height: 33 * 9 + 7,
};
let counterHeight = 7;

switch (level) {
  case 'beginner':
    settings.level = {
      columns: 9,
      rows: 9,
      mines: 10,
    };
    boardSize = {
      width: squareSize * settings.level.columns,
      height: squareSize * settings.level.rows + counterHeight,
    };
    break;
  case 'intermediate':
    settings.level = {
      columns: 16,
      rows: 16,
      mines: 40,
    };
    boardSize = {
      width: squareSize * settings.level.columns,
      height: squareSize * settings.level.rows + counterHeight,
    };
    break;
  case 'expert':
    settings.level = {
      columns: 30,
      rows: 16,
      mines: 99,
    };
    boardSize = {
      width: squareSize * settings.level.columns,
      height: squareSize * settings.level.rows + counterHeight,
    };
    break;
  case 'custom':
    let columns = parseInt(window.localStorage.getItem('columns'), 10);
    if (columns < 7) {
      columns = 7;
      window.localStorage.setItem('columns', columns);
    } else if (columns > 100) {
      columns = 100;
      window.localStorage.setItem('columns', columns);
    }

    let rows = parseInt(window.localStorage.getItem('rows'), 10);
    if (rows < 7) {
      rows = 7;
      window.localStorage.setItem('rows', rows);
    } else if (rows > 100) {
      rows = 100;
      window.localStorage.setItem('rows', rows);
    }

    let mines = parseInt(window.localStorage.getItem('mines'), 10);
    if (mines < 1) {
      mines = 1;
      window.localStorage.setItem('mines', mines);
    }
    if (mines > columns * rows - 1) {
      mines = columns * rows - 1;
      window.localStorage.setItem('mines', mines);
    }

    settings.level = {
      columns,
      rows,
      mines,
    };
    boardSize = {
      width: squareSize * settings.level.columns,
      height: squareSize * settings.level.rows + counterHeight,
    };
    break;
}

let initialMines = settings.level.mines; // Used by the mine counter
let numberOfMines = initialMines; // Used to calculate mines to be allocated to squares
let squareCounter = 0; // The unique identifier of each square
let minedSquares = []; // A array containing the unique identifiers of all the squares that will contain mines

let flaggedSquares = 0; // Number of squares currently flagged
let moves = 0; // total number of moves
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
      let newSquare = new Square(i, j, squareCounter);
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
  squares.forEach(s => {
    // Find squares touching each square
    let neighbors = getNeighbors(s);
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    s.minesAround = neighbors.map(n => n.mine).reduce(reducer); // Add all mine values to find total
  });
}

// Time counter
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
    boardSize.height + squareSize * 0.75 // Added extra space for the mines, moves, and time counters
  );
  cnv.parent('board');

  textFont(font);

  // Mine allocation
  if (window.location.hash === '#debug') {
    // Forcer functionality
    const savedMines = JSON.stringify(window.localStorage.getItem('mines'));
    const mines = JSON.parse(savedMines);
    if (mines) {
      minedSquares = mines;
      const numberOfMines = window.localStorage.getItem('numberOfMines');
      initialMines = parseInt(numberOfMines, 10);
      window.localStorage.removeItem('mines');
      window.localStorage.removeItem('numberOfMines');
    } else {
      allocateMines();
    }
  } else {
    allocateMines();
  }
  generateSquares();
  calculateMines();
}

/**
 * Draw
 */
function draw() {
  darkMode ? background(25) : background(255);

  if (squares.length !== 0) {
    squares.forEach(function (s) {
      s.draw();
    });
  }

  // Show mines, moves, and time
  textSize(squareSize * 0.6);

  const columns = settings.level.columns;

  // Mine counter
  if (flaggedSquares > initialMines) {
    fill(248, 49, 47);
  } else {
    darkMode ? fill(225) : fill(48);
  }
  image(
    MINE,
    columns < 9
      ? width / 2 - squareSize * 1.975 + squareSize * 0.99 - 2.4 * squareSize
      : width / 2 - squareSize * 1.975 + squareSize * 0.99 - 3.4 * squareSize,
    boardSize.height,
    squareSize * 0.65,
    squareSize * 0.65
  );
  text(
    nf(Math.max(initialMines - flaggedSquares, 0), 3),
    columns < 9
      ? width / 2 - squareSize * 1.975 + squareSize * 0.99 - 1.6 * squareSize
      : width / 2 - squareSize * 1.975 + squareSize * 0.99 - 2.5 * squareSize,
    boardSize.height + 19
  );

  // Moves counter
  darkMode ? fill(225) : fill(48);
  image(
    MOVES,
    width / 2 - squareSize * 1.975 + squareSize * 1.02,
    boardSize.height,
    squareSize * 0.65,
    squareSize * 0.65
  );

  if (newBestMoves) {
    fill(255, 176, 46);
  }
  text(
    nf(moves, 3),
    width / 2 - squareSize * 1.975 + squareSize * 1.85,
    boardSize.height + 19
  );

  // Time counter
  darkMode ? fill(225) : fill(48);
  image(
    TIMER,
    columns < 9
      ? width / 2 - squareSize * 1.975 + squareSize * 0.99 + 2.7 * squareSize
      : width / 2 - squareSize * 1.975 + squareSize * 0.99 + 3.6 * squareSize,
    boardSize.height,
    squareSize * 0.65,
    squareSize * 0.65
  );

  if (newBestTime) {
    fill(255, 176, 46);
  }
  text(
    nf(timePassed, 3),
    columns < 9
      ? width / 2 - squareSize * 1.975 + squareSize * 0.99 + 3.4 * squareSize
      : width / 2 - squareSize * 1.975 + squareSize * 0.99 + 4.35 * squareSize,
    boardSize.height + 19
  );
  textSize(squareSize - squareSize * 0.05);
}

// Get neighbors
function getNeighbors(square) {
  return squares.filter(n => {
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
    if (window.location.hash === '') {
      let played;
      switch (level) {
        case 'beginner':
          played = parseInt(window.localStorage.getItem('beginnerPlayed'));
          played += 1;
          window.localStorage.setItem('beginnerPlayed', played);
          break;
        case 'intermediate':
          played = parseInt(window.localStorage.getItem('intermediatePlayed'));
          played += 1;
          window.localStorage.setItem('intermediatePlayed', played);
          break;
        case 'expert':
          played = parseInt(window.localStorage.getItem('expertPlayed'));
          played += 1;
          window.localStorage.setItem('expertPlayed', played);
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
    squares.forEach(s => {
      s.opened = true;
    });
    noLoop();
    return;
  }
  if (square.minesAround == 0) {
    // Recursively open neighbors
    let neighbors = getNeighbors(square);
    neighbors.forEach(s => {
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
  if (JSON.parse(window.localStorage.getItem('modalOpen')) === true) {
    return;
  }

  // Chord
  if (mouseButton === CENTER) {
    if (!gameFinished) {
      let square = squares.find(s => {
        return (
          s.x < mouseX &&
          s.x + squareSize > mouseX &&
          s.y < mouseY &&
          s.y + squareSize > mouseY
        );
      });

      if (square) {
        moves += 1;
      }

      if (square && square.opened && square.minesAround > 0) {
        let neighbors = getNeighbors(square);
        let flaggedNeighbors = 0;

        neighbors.forEach(s => {
          if (s.flagged) {
            flaggedNeighbors += 1;
          }
        });

        if (square.minesAround === flaggedNeighbors) {
          let openedSquares = 0;

          neighbors.forEach(s => {
            if (!s.opened && !s.flagged) {
              openSquare(s);

              if (s.mine) {
                if (!gameFinished) {
                  gameLost();
                  gameEnded();
                }
              } else {
                // Check if the game has been won
                let squaresLeft = squares.filter(s => {
                  return !s.mine && !s.opened;
                }).length;

                if (squaresLeft == 0) {
                  if (!gameFinished) {
                    gameWon();
                    gameEnded();
                  }
                }
              }

              openedSquares += 1;
            }
          });

          if (openedSquares > 0) {
            addMove();
          }
        }
      }
    }
  }

  // Flags
  if (
    mouseButton === RIGHT ||
    JSON.parse(window.localStorage.getItem('flagMode'))
  ) {
    // Find the square the player clicked on
    let square = squares.find(s => {
      return (
        s.x < mouseX &&
        s.x + squareSize > mouseX &&
        s.y < mouseY &&
        s.y + squareSize > mouseY
      );
    });
    if (square) {
      moves += 1;

      // Prevent opened squares from being flagged
      if (!square.opened) {
        if (!square.flagged) {
          flaggedSquares += 1;
          addMove();
        } else {
          flaggedSquares -= 1;
          addMove();
        }
        square.flagged = !square.flagged;
      }
    }
  }

  // Find the square pressed on
  if (
    mouseButton === LEFT &&
    !JSON.parse(window.localStorage.getItem('flagMode'))
  ) {
    if (!gameFinished) {
      let square = squares.find(s => {
        return (
          s.x < mouseX &&
          s.x + squareSize > mouseX &&
          s.y < mouseY &&
          s.y + squareSize > mouseY
        );
      });
      if (square) {
        moves += 1;

        if (square.flagged || square.opened) {
          return; // Do not allow opening when flagged
        }
        openSquare(square);
        addMove();
        if (square.mine) {
          if (!gameFinished) {
            gameLost();
            gameEnded();
          }
        } else {
          // Check if the game has been won
          let squaresLeft = squares.filter(s => {
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
 * End of game
 */
// Handle end
function gameEnded() {
  gameFinished = true;
  if (window.location.hash === '') {
    calculateWinPercentage();

    let totalTime;
    switch (level) {
      case 'beginner':
        totalTime = parseInt(window.localStorage.getItem('beginnerTotalTime'));
        totalTime += timePassed;
        window.localStorage.setItem('beginnerTotalTime', totalTime);
        break;
      case 'intermediate':
        totalTime = parseInt(
          window.localStorage.getItem('intermediateTotalTime')
        );
        totalTime += timePassed;
        window.localStorage.setItem('intermediateTotalTime', totalTime);
        break;
      case 'expert':
        totalTime = parseInt(window.localStorage.getItem('expertTotalTime'));
        totalTime += timePassed;
        window.localStorage.setItem('expertTotalTime', totalTime);
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
  if (window.location.hash === '') {
    let won;
    switch (level) {
      case 'beginner':
        won = parseInt(window.localStorage.getItem('beginnerWon'));
        won += 1;
        window.localStorage.setItem('beginnerWon', won);
        break;
      case 'intermediate':
        won = parseInt(window.localStorage.getItem('intermediateWon'));
        won += 1;
        window.localStorage.setItem('intermediateWon', won);
        break;
      case 'expert':
        won = parseInt(window.localStorage.getItem('expertWon'));
        won += 1;
        window.localStorage.setItem('expertWon', won);
        break;
    }

    // Moves Data
    let bestMoves;
    switch (level) {
      case 'beginner':
        bestMoves = Number(window.localStorage.getItem('beginnerBestMoves'));
        break;
      case 'intermediate':
        bestMoves = Number(
          window.localStorage.getItem('intermediateBestMoves')
        );
        break;
      case 'expert':
        bestMoves = Number(window.localStorage.getItem('expertBestMoves'));
        break;
    }

    if (bestMoves === 0) {
      switch (level) {
        case 'beginner':
          window.localStorage.setItem('beginnerBestMoves', moves);
          break;
        case 'intermediate':
          window.localStorage.setItem('intermediateBestMoves', moves);
          break;
        case 'expert':
          window.localStorage.setItem('expertBestMoves', moves);
          break;
      }
    } else {
      if (moves < bestMoves) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestMoves = true;
        switch (level) {
          case 'beginner':
            window.localStorage.setItem('beginnerBestMoves', moves);
            break;
          case 'intermediate':
            window.localStorage.setItem('intermediateBestMoves', moves);
            break;
          case 'expert':
            window.localStorage.setItem('expertBestMoves', moves);
            break;
        }
        window.localStorage.setItem('newBestMoves', 'true');
      }
    }

    // Time Data
    const endTime = new Date();
    let seconds = (endTime - startTime) / 1000; //initially in milliseconds, divide by 1000 for seconds
    time = seconds;

    let bestTime;
    switch (level) {
      case 'beginner':
        bestTime = Number(window.localStorage.getItem('beginnerBestTime'));
        break;
      case 'intermediate':
        bestTime = Number(window.localStorage.getItem('intermediateBestTime'));
        break;
      case 'expert':
        bestTime = Number(window.localStorage.getItem('expertBestTime'));
        break;
    }

    if (bestTime === 0) {
      switch (level) {
        case 'beginner':
          window.localStorage.setItem('beginnerBestTime', seconds);
          break;
        case 'intermediate':
          window.localStorage.setItem('intermediateBestTime', seconds);
          break;
        case 'expert':
          window.localStorage.setItem('expertBestTime', seconds);
          break;
      }
    } else {
      if (seconds < bestTime) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestTime = true;
        switch (level) {
          case 'beginner':
            window.localStorage.setItem('beginnerBestTime', seconds);
            break;
          case 'intermediate':
            window.localStorage.setItem('intermediateBestTime', seconds);
            break;
          case 'expert':
            window.localStorage.setItem('expertBestTime', seconds);
            break;
        }
        window.localStorage.setItem('newBestTime', 'true');
      }
    }
  }
  stopTimer = true;

  const header = document.getElementById('header');
  header.classList.add('wavy');

  const bbbv = calculate3BV(squares);
  const bbbvPerSec = Math.round((bbbv / time + Number.EPSILON) * 10000) / 10000;
  const efficinecny = Math.round((bbbv / moves) * 100);

  window.localStorage.setItem('time', time);
  window.localStorage.setItem('bbbv', bbbv);
  window.localStorage.setItem('bbbvPerSec', bbbvPerSec);
  window.localStorage.setItem('moves', moves);
  window.localStorage.setItem('moves', moves);
  window.localStorage.setItem('efficinecny', efficinecny);

  gameHasEnded();
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
    case 'beginner':
      totalMoves = parseInt(window.localStorage.getItem('beginnerTotalMoves'));
      totalMoves += 1;
      window.localStorage.setItem('beginnerTotalMoves', totalMoves);
      break;
    case 'intermediate':
      totalMoves = parseInt(
        window.localStorage.getItem('intermediateTotalMoves')
      );
      totalMoves += 1;
      window.localStorage.setItem('intermediateTotalMoves', totalMoves);
      break;
    case 'expert':
      totalMoves = parseInt(window.localStorage.getItem('expertTotalMoves'));
      totalMoves += 1;
      window.localStorage.setItem('expertTotalMoves', totalMoves);
      break;
  }
}

// Calculate percentage of wins / total games played
function calculateWinPercentage() {
  if (window.location.hash === '') {
    let played, won;
    switch (level) {
      case 'beginner':
        played = parseInt(window.localStorage.getItem('beginnerPlayed'));
        won = parseInt(window.localStorage.getItem('beginnerWon'));
        break;
      case 'intermediate':
        played = parseInt(window.localStorage.getItem('intermediatePlayed'));
        won = parseInt(window.localStorage.getItem('intermediateWon'));
        break;
      case 'expert':
        played = parseInt(window.localStorage.getItem('expertPlayed'));
        won = parseInt(window.localStorage.getItem('expertWon'));
        break;
    }
    let winPercentage = null;

    if (played !== 0) {
      winPercentage = won / played;
    }

    if (winPercentage !== null) {
      // Update local storage
      switch (level) {
        case 'beginner':
          window.localStorage.setItem('beginnerWinPercentage', winPercentage);
          break;
        case 'intermediate':
          window.localStorage.setItem(
            'intermediateWinPercentage',
            winPercentage
          );
          break;
        case 'expert':
          window.localStorage.setItem('expertWinPercentage', winPercentage);
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
  if (
    (keyCode === 49 || keyCode === 97) &&
    window.location.hash !== '#debug' &&
    window.localStorage.getItem('modalOpen') === false
  ) {
    if (level !== 'beginner') {
      window.localStorage.setItem('level', 'beginner');
      window.location.reload();
    }
  }
  if (
    (keyCode === 50 || keyCode === 98) &&
    window.location.hash !== '#debug' &&
    window.localStorage.getItem('modalOpen') === false
  ) {
    if (level !== 'intermediate') {
      window.localStorage.setItem('level', 'intermediate');
      window.location.reload();
    }
  }
  if (
    (keyCode === 51 || keyCode === 99) &&
    window.location.hash !== '#debug' &&
    window.localStorage.getItem('modalOpen') === false
  ) {
    if (level !== 'expert') {
      window.localStorage.setItem('level', 'expert');
      window.location.reload();
    }
  }

  // New Game
  if (keyCode === 78) {
    window.location.reload();
  }
}

/**
 * End of game event
 */
function gameHasEnded() {
  const gameHasEnded = new CustomEvent('gameHasEnded');
  document.dispatchEvent(gameHasEnded);
}

/**
 * 3BV utilities
 */
// Transform the board of square into a logical matrix (0 for empty squares, 1 for mines)
function transformBoard(board) {
  // Determine the board dimensions
  const numRows = Math.max(...board.map(square => square.j)) + 1;
  const numCols = Math.max(...board.map(square => square.i)) + 1;

  // Initialize an empty 2D array with the dimensions of the board
  const transformedBoard = Array.from({ length: numRows }, () =>
    Array(numCols).fill(0)
  );

  // Populate the 2D array based on the 'mine' property of each square
  board.forEach(square => {
    transformedBoard[square.j][square.i] = square.mine ? 1 : 0;
  });

  return transformedBoard;
}

function calculate3BV(board) {
  board = transformBoard(board);
  const width = board.length;
  const height = board.length;
  const cells = [];

  // Initialize cells with the given board
  for (let i = 0; i < width; i++) {
    const row = [];
    for (let j = 0; j < height; j++) {
      row.push({
        x: i,
        y: j,
        number: board[j][i] === 1 ? -1 : 0,
        group: 0,
      });
    }
    cells.push(row);
  }

  // Function to get surrounding cells
  function arround(cell) {
    const result = [];
    for (
      let i = Math.max(0, cell.x - 1);
      i <= Math.min(width - 1, cell.x + 1);
      i++
    ) {
      for (
        let j = Math.max(0, cell.y - 1);
        j <= Math.min(height - 1, cell.y + 1);
        j++
      ) {
        result.push(cells[i][j]);
      }
    }
    return result;
  }

  // Calculate numbers for each cell
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = cells[i][j];
      if (cell.number === -1) continue;
      cell.number = arround(cell).filter(a => a.number === -1).length;
    }
  }

  let current_group = 1;

  // Grouping zero cells
  cells.flat().forEach(cell => {
    if (cell.group === 0 && cell.number === 0) {
      cell.group = current_group;

      while (true) {
        let has_new = false;

        cells.flat().forEach(cell2 => {
          if (cell2.group === current_group) {
            arround(cell2).forEach(a => {
              if (a.number === 0 && a.group === 0) {
                a.group = current_group;
                has_new = true;
              }
            });
          }
        });

        if (!has_new) break;
      }
      current_group++;
    }
  });

  const opening_count = current_group - 1;

  // Expand groups to adjacent cells
  cells.flat().forEach(cell => {
    if (cell.group !== 0 || cell.number === -1) return;

    arround(cell).forEach(a => {
      if (a.group !== 0 && a.number === 0) {
        cell.group = a.group;
      }
    });
  });

  // Assign groups to remaining cells
  cells.flat().forEach(cell => {
    if (cell.group !== 0 || cell.number === -1) return;
    cell.group = current_group++;
  });

  current_group--;
  const bbbv = current_group;

  return bbbv;
}
