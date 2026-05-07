/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  minesweeperEmoji.js contains the game functionality,
 *  everything that happens inside the game's board. It
 *  also handles the update of the stats accordingly.
 */

(() => {
  // Prevent right mouse click from opening browser context menu in order to be able to flag
  document.addEventListener('contextmenu', event => event.preventDefault());

  // Canvas
  let cnv; // The canvas element that will contain the game

  // Reset end of game stats
  window.statsStore.resetCurrentGameSummary();

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
  const imageCache = new Map();
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
  let gameResult = null;

  function loadCachedImage(path) {
    if (!imageCache.has(path)) {
      imageCache.set(
        path,
        loadImage(path, () => {
          if (gameFinished) {
            redraw();
          }
        })
      );
    }

    return imageCache.get(path);
  }

  function syncEndGameEmoji() {
    if (!gameFinished) {
      return;
    }

    if (newBestMoves || newBestTime) {
      NUMBERS[0] = BEST;
      return;
    }

    NUMBERS[0] = gameResult === 'won' ? WON : LOST;
  }

  function closedSquarePath() {
    return darkMode ? darkTheme.closed : 'emoji/black_square_button_flat.png';
  }

  function emptySquarePath() {
    return darkMode ? darkTheme.empty : 'emoji/white_large_square_flat.png';
  }

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
        // The mine the player clicked
        image(DETONATION, this.x, this.y, squareSize, squareSize);
        return;
      }

      if (this.opened && this.mine) {
        // Mine the played didn't click
        image(MINE, this.x, this.y, squareSize, squareSize);
        return;
      }

      if (this.opened && this.flagged) {
        // Flagged square was not a mine
        image(WRONG, this.x, this.y, squareSize, squareSize);
        return;
      }
      if (this.opened) {
        // Opened square showing the number of mines touching the square
        image(
          NUMBERS[this.minesAround],
          this.x,
          this.y,
          squareSize,
          squareSize
        );
        return;
      }

      if (this.flagged) {
        image(FLAG, this.x, this.y, squareSize, squareSize);
        return;
      }

      image(CLOSED, this.x, this.y, squareSize, squareSize);

      // Square numbers and mine locations for debugging
      if (window.location.hash === '#debug') {
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

  function preload() {
    CLOSED = loadCachedImage(closedSquarePath());
    NUMBERS[0] = loadCachedImage(emptySquarePath());
    NUMBERS[1] = loadCachedImage('emoji/keycap_1_flat.png');
    NUMBERS[2] = loadCachedImage('emoji/keycap_2_flat.png');
    NUMBERS[3] = loadCachedImage('emoji/keycap_3_flat.png');
    NUMBERS[4] = loadCachedImage('emoji/keycap_4_flat.png');
    NUMBERS[5] = loadCachedImage('emoji/keycap_5_flat.png');
    NUMBERS[6] = loadCachedImage('emoji/keycap_6_flat.png');
    NUMBERS[7] = loadCachedImage('emoji/keycap_7_flat.png');
    NUMBERS[8] = loadCachedImage('emoji/keycap_8_flat.png');
    NUMBERS[9] = loadCachedImage('emoji/keycap_9_flat.png');
    FLAG = loadCachedImage('emoji/triangular_flag_flat.png');
    WRONG = loadCachedImage('emoji/cross_mark_flat.png');
    TIMER = loadCachedImage('emoji/hourglass_done_flat.png');
    MOVES = loadCachedImage('emoji/abacus_flat.png');
    BEST = loadCachedImage('emoji/partying_face_flat.png');
    WON = loadCachedImage(themes[theme]['won']);
    LOST = loadCachedImage(themes[theme]['lost']);
    MINE = loadCachedImage(themes[theme]['mine']);
    DETONATION = loadCachedImage(themes[theme]['detonation']);

    font = loadFont('fonts/Nunito-Black.ttf');
  }

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
    level = 'beginner';
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
      let { columns, rows, mines } = window.customLevelRules.readCustomLevel();
      window.customLevelRules.saveCustomLevel({ columns, rows, mines });

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
      let { columns, rows, mines } = window.customLevelRules.readCustomLevel();
      window.customLevelRules.saveCustomLevel({ columns, rows, mines });

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

  let timerInterval = null; // the timer's interval ID

  function levelSettings(nextLevel) {
    switch (nextLevel) {
      case 'intermediate':
        return {
          columns: 16,
          rows: 16,
          mines: 40,
        };
      case 'expert':
        return {
          columns: 30,
          rows: 16,
          mines: 99,
        };
      case 'custom':
        return window.customLevelRules.readCustomLevel();
      case 'beginner':
      default:
        return {
          columns: 9,
          rows: 9,
          mines: 10,
        };
    }
  }

  function boardHeightForRows(nextRows) {
    return 328 + (nextRows - 9) * squareSize;
  }

  function configureLevel(nextLevel) {
    level = nextLevel;
    window.localStorage.setItem('level', level);

    settings.level = levelSettings(level);
    columns = settings.level.columns;
    rows = settings.level.rows;
    numberOfSquares = rows * columns;
    boardSize = {
      width: squareSize * columns,
      height: squareSize * rows + counterHeight,
    };
    initialMines = settings.level.mines;
    numberOfMines = initialMines;

    const board = document.getElementById('board');
    if (board) {
      board.style.height = `${boardHeightForRows(rows)}px`;
    }

    if (cnv) {
      resizeCanvas(boardSize.width, boardSize.height + squareSize * 0.75);
    }
  }

  function resetGame(forcedMines = null) {
    // 1. Reset all game state variables to their initial values
    squares = [];
    minedSquares = [];
    squareCounter = 0;
    initialMines = settings.level.mines;
    numberOfMines = initialMines;
    flaggedSquares = 0;
    moves = 0;
    startTime = null;
    timePassed = 0;
    gameFinished = false;
    gameResult = null;
    isFirstClick = true;
    mineReallocated = false;
    newBestMoves = false;
    newBestTime = false;

    // 2. Stop and reset the timer
    stopTimer = true; // Ensure any running timer loop stops
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    stopTimer = false; // Reset the flag for the next game

    // 3. Reset the visual state of emojis
    CLOSED = loadCachedImage(closedSquarePath());
    NUMBERS[0] = loadCachedImage(emptySquarePath());

    // 4. Remove end-game visual effects from the header
    const header = document.getElementById('header');
    if (header) {
      header.classList.remove('wavy');
      header.style.color = ''; // Resets to default CSS color
    }

    // 5. Re-initialize the board with new mines
    seedMines(forcedMines);
    generateSquares();
    calculateMines();

    // 6. Tell p5.js to start the draw loop again
    loop();
  }

  function setTheme(nextTheme) {
    theme = nextTheme;
    WON = loadCachedImage(themes[theme].won);
    LOST = loadCachedImage(themes[theme].lost);
    MINE = loadCachedImage(themes[theme].mine);
    DETONATION = loadCachedImage(themes[theme].detonation);
    syncEndGameEmoji();

    if (gameFinished) {
      redraw();
    } else {
      loop();
    }
  }

  function setDarkMode(nextDarkMode) {
    darkMode = nextDarkMode;
    CLOSED = loadCachedImage(closedSquarePath());

    if (!gameFinished) {
      NUMBERS[0] = loadCachedImage(emptySquarePath());
    }

    if (gameFinished) {
      redraw();
    } else {
      loop();
    }
  }

  function setLevel(nextLevel) {
    configureLevel(nextLevel);
    resetGame();
  }

  function setForcedMines(nextForcedMines) {
    const forcedMines = normalizeMines(nextForcedMines);

    if (forcedMines.length === 0) {
      return false;
    }

    resetGame(forcedMines);
    return true;
  }

  window.emojiMinesweeper = Object.freeze({
    resetGame,
    setTheme,
    setDarkMode,
    setLevel,
    setForcedMines,
    isGameFinished: () => gameFinished,
  });

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

  function normalizeMines(candidateMines) {
    if (!Array.isArray(candidateMines)) {
      return [];
    }

    return candidateMines
      .map(mine => Number.parseInt(mine, 10))
      .filter(
        mine => Number.isInteger(mine) && mine >= 0 && mine < numberOfSquares
      )
      .filter((mine, index, mines) => mines.indexOf(mine) === index);
  }

  function seedMines(forcedMines = null) {
    const normalizedForcedMines = normalizeMines(forcedMines);

    if (normalizedForcedMines.length > 0) {
      minedSquares = normalizedForcedMines;
      initialMines = normalizedForcedMines.length;
      numberOfMines = 0;
      return;
    }

    allocateMines();
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

  function startTimer() {
    // Clear any previous interval to prevent multiple timers running
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    // Store the interval ID so we can clear it later
    timerInterval = setInterval(() => {
      if (!stopTimer) {
        timePassed += 1;
      }
    }, 1000);
  }

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
      seedMines(readForcedMines());
      window.localStorage.removeItem('forcedMines');
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
        : width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 +
            4.35 * squareSize,
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

      if (window.location.hash === '') {
        window.statsStore.recordGameStarted(level);
      }

      if (square.mine && window.location.hash !== '#debug') {
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
                    gameEnded(false);
                  }
                } else {
                  // Check if the game has been won
                  let squaresLeft = squares.filter(s => {
                    return !s.mine && !s.opened;
                  }).length;

                  if (squaresLeft == 0) {
                    if (!gameFinished) {
                      gameWon();
                      gameEnded(true);
                    }
                  }
                }

                openedSquares += 1;
              }
            });

            if (openedSquares > 0) {
              window.emojiMinesweeperAudio?.playSound('pop');
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
          window.emojiMinesweeperAudio?.playSound('flag');

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
              gameEnded(false);
            }
          } else {
            window.emojiMinesweeperAudio?.playSound('pop');

            // Check if the game has been won
            let squaresLeft = squares.filter(s => {
              return !s.mine && !s.opened;
            }).length;
            if (squaresLeft == 0) {
              if (!gameFinished) {
                gameWon();
                gameEnded(true);
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
  function gameEnded(won) {
    gameFinished = true;
    gameResult = won ? 'won' : 'lost';
    if (window.location.hash === '') {
      time = startTime ? (new Date() - startTime) / 1000 : timePassed;
      window.statsStore.recordGameEnded(level, { won, time, moves });
    }
  }

  function readForcedMines() {
    try {
      const savedForcedMines = JSON.parse(
        window.localStorage.getItem('forcedMines') ?? '[]'
      );

      if (!Array.isArray(savedForcedMines)) {
        return [];
      }

      return normalizeMines(savedForcedMines);
    } catch {
      return [];
    }
  }

  // Handle win
  function gameWon() {
    window.emojiMinesweeperAudio?.playSound('win');

    NUMBERS[0] = WON;
    squares.forEach(function (s) {
      s.opened = true;
    });

    if (window.location.hash === '') {
      if (window.statsStore.hasBestMoves(level, moves)) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestMoves = true;
      }

      const endTime = new Date();
      let seconds = (endTime - startTime) / 1000; //initially in milliseconds, divide by 1000 for seconds
      time = seconds;

      if (window.statsStore.hasBestTime(level, seconds)) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestTime = true;
      }
    }
    stopTimer = true;
    if (timerInterval) clearInterval(timerInterval); // Stop the timer

    const header = document.getElementById('header');
    header.classList.add('wavy');

    const bbbv = calculate3BV(squares);
    const bbbvPerSec =
      Math.round((bbbv / time + Number.EPSILON) * 10000) / 10000;
    const efficinecny = Math.round((bbbv / moves) * 100);

    window.statsStore.setCurrentGameSummary({
      time,
      bbbv,
      bbbvPerSec,
      moves,
      efficinecny,
    });

    gameHasEnded();
  }

  // handle loss
  function gameLost() {
    window.emojiMinesweeperAudio?.playSound('loss');

    NUMBERS[0] = LOST;
    squares.forEach(function (s) {
      s.opened = true;
    });

    const endTime = new Date();
    let time = endTime - startTime; //in ms
    time = time / 1000;
    stopTimer = true;
    if (timerInterval) clearInterval(timerInterval); // Stop the timer
  }

  // Add move to total moves
  function addMove() {
    if (window.location.hash === '') {
      window.statsStore.recordMove(level);
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
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('beginner');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'beginner' } })
      );
    }
    if (
      (keyCode === 50 || keyCode === 98) &&
      window.location.hash !== '#debug' &&
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('intermediate');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'intermediate' } })
      );
    }
    if (
      (keyCode === 51 || keyCode === 99) &&
      window.location.hash !== '#debug' &&
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('expert');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'expert' } })
      );
    }

    // New Game
    if (keyCode === 78) {
      resetGame();
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

  window.preload = preload;
  window.setup = setup;
  window.draw = draw;
  window.mousePressed = mousePressed;
  window.keyPressed = keyPressed;
})();
