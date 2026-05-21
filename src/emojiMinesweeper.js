/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  minesweeperEmoji.js contains the game functionality,
 *  everything that happens inside the game's board. It
 *  also handles the update of the stats accordingly.
 */

import { darkTheme, themes } from './themes.js';

(() => {
  const p5Global =
    name =>
    (...args) =>
      window[name](...args);
  const background = p5Global('background');
  const createCanvas = p5Global('createCanvas');
  const fill = p5Global('fill');
  const image = p5Global('image');
  const loadFont = p5Global('loadFont');
  const loadImage = p5Global('loadImage');
  const loop = p5Global('loop');
  const nf = p5Global('nf');
  const noLoop = p5Global('noLoop');
  const redraw = p5Global('redraw');
  const resizeCanvas = p5Global('resizeCanvas');
  const text = p5Global('text');
  const textFont = p5Global('textFont');
  const textSize = p5Global('textSize');

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
  let lastRecordedTime = null; // used to persist total time while playing
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
    if (!gameFinished) {
      recordElapsedTime();
    }

    // 1. Reset all game state variables to their initial values
    squares = [];
    minedSquares = [];
    squareCounter = 0;
    initialMines = settings.level.mines;
    numberOfMines = initialMines;
    flaggedSquares = 0;
    moves = 0;
    startTime = null;
    lastRecordedTime = null;
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

  function recordElapsedTime() {
    if (window.location.hash !== '' || !startTime || !lastRecordedTime) {
      return;
    }

    const currentTime = new Date();
    const elapsedSeconds = (currentTime - lastRecordedTime) / 1000;
    lastRecordedTime = currentTime;
    window.statsStore.recordTime(level, elapsedSeconds);
  }

  function startTimer() {
    // Clear any previous interval to prevent multiple timers running
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    // Store the interval ID so we can clear it later
    timerInterval = setInterval(() => {
      if (!stopTimer) {
        timePassed += 1;
        recordElapsedTime();
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
    bindBoardPointerEvents();

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
        ? window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 -
            2.4 * squareSize
        : window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 -
            3.4 * squareSize,
      boardSize.height,
      squareSize * 0.65,
      squareSize * 0.65
    );
    text(
      nf(Math.max(initialMines - flaggedSquares, 0), 3),
      columns < 9
        ? window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 -
            1.6 * squareSize
        : window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 -
            2.5 * squareSize,
      boardSize.height + 19
    );

    // Moves counter
    darkMode ? fill(225) : fill(48);
    image(
      MOVES,
      window.width / 2 - squareSize * 1.975 + squareSize * 1.02,
      boardSize.height,
      squareSize * 0.65,
      squareSize * 0.65
    );

    if (newBestMoves) {
      fill(255, 176, 46);
    }
    text(
      nf(moves, 3),
      window.width / 2 - squareSize * 1.975 + squareSize * 1.85,
      boardSize.height + 19
    );

    // Time counter
    darkMode ? fill(225) : fill(48);
    image(
      TIMER,
      columns < 9
        ? window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 +
            2.7 * squareSize
        : window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 +
            3.6 * squareSize,
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
        ? window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 +
            3.4 * squareSize
        : window.width / 2 -
            squareSize * 1.975 +
            squareSize * 0.99 +
            4.35 * squareSize,
      boardSize.height + 19
    );
    textSize(squareSize - squareSize * 0.05);
  }

  function pointerPositionFromEvent(event) {
    if (!cnv?.elt) {
      return null;
    }

    const rect = cnv.elt.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function findSquareAtPosition(x, y) {
    return squares.find(s => {
      return s.x < x && s.x + squareSize > x && s.y < y && s.y + squareSize > y;
    });
  }

  function findSquareAtPointer() {
    return findSquareAtPosition(window.mouseX, window.mouseY);
  }

  function isModalOpen() {
    return JSON.parse(window.localStorage.getItem('modalOpen')) === true;
  }

  function isFlagMode() {
    return JSON.parse(window.localStorage.getItem('flagMode')) === true;
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
  const longTapDelay = 400;
  const touchMoveTolerance = 10;
  let activeTouchPress = null;
  let ignoreMousePressedUntil = 0;

  // What happens every time the player clicks on a square
  function openSquare(square) {
    // Make sure first click is not on a mine
    if (isFirstClick) {
      startTimer();
      startTime = new Date();
      lastRecordedTime = startTime;

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

  function checkGameWon() {
    let squaresLeft = squares.filter(s => {
      return !s.mine && !s.opened;
    }).length;

    if (squaresLeft == 0 && !gameFinished) {
      gameWon();
      gameEnded(true);
    }
  }

  function chordSquare(square) {
    if (!square || !square.opened || square.minesAround === 0) {
      return;
    }

    let neighbors = getNeighbors(square);
    let flaggedNeighbors = 0;

    neighbors.forEach(s => {
      if (s.flagged) {
        flaggedNeighbors += 1;
      }
    });

    if (square.minesAround !== flaggedNeighbors) {
      return;
    }

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
          checkGameWon();
        }

        openedSquares += 1;
      }
    });

    if (openedSquares > 0) {
      window.emojiMinesweeperAudio?.playSound('pop');
      addMove();
    }
  }

  function suppressSyntheticMousePress() {
    ignoreMousePressedUntil = Date.now() + 500;
  }

  function shouldIgnoreMousePressed() {
    return Date.now() < ignoreMousePressedUntil;
  }

  function movedPastTouchTolerance(event, touchPress) {
    const deltaX = event.clientX - touchPress.clientX;
    const deltaY = event.clientY - touchPress.clientY;

    return Math.hypot(deltaX, deltaY) > touchMoveTolerance;
  }

  function clearActiveTouchTimer() {
    if (activeTouchPress?.timerId) {
      clearTimeout(activeTouchPress.timerId);
    }
  }

  function releaseTouchPointer(board, pointerId) {
    if (board.hasPointerCapture?.(pointerId)) {
      board.releasePointerCapture(pointerId);
    }
  }

  function flagSquare(square) {
    if (!square) {
      return;
    }

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

  function openSquareFromInput(square) {
    if (!square || gameFinished) {
      return;
    }

    if (square.flagged) {
      return; // Do not allow opening when flagged
    }

    if (square.opened) {
      return;
    }

    moves += 1;
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
      checkGameWon();
    }
  }

  function chordSquareFromInput(square) {
    if (!square || gameFinished) {
      return;
    }

    moves += 1;
    chordSquare(square);
  }

  function tapSquare(square) {
    if (isFlagMode()) {
      flagSquare(square);
      return;
    }

    if (square?.opened && !square.flagged) {
      chordSquareFromInput(square);
      return;
    }

    openSquareFromInput(square);
  }

  function cancelActiveTouchPress() {
    clearActiveTouchTimer();
    activeTouchPress = null;
  }

  function handleTouchPointerDown(event, board) {
    if (event.pointerType !== 'touch' || event.isPrimary === false) {
      return false;
    }

    event.preventDefault();
    suppressSyntheticMousePress();

    if (gameFinished || isModalOpen()) {
      return true;
    }

    const position = pointerPositionFromEvent(event);
    if (!position) {
      return true;
    }

    const square = findSquareAtPosition(position.x, position.y);
    if (!square) {
      return true;
    }

    cancelActiveTouchPress();
    board.setPointerCapture?.(event.pointerId);

    activeTouchPress = {
      pointerId: event.pointerId,
      square,
      clientX: event.clientX,
      clientY: event.clientY,
      canceled: false,
      longTapped: false,
      timerId: window.setTimeout(() => {
        if (
          !activeTouchPress ||
          activeTouchPress.pointerId !== event.pointerId
        ) {
          return;
        }

        activeTouchPress.longTapped = true;
        flagSquare(activeTouchPress.square);
      }, longTapDelay),
    };

    return true;
  }

  function handleTouchPointerMove(event) {
    if (!activeTouchPress || event.pointerId !== activeTouchPress.pointerId) {
      return;
    }

    event.preventDefault();
    suppressSyntheticMousePress();

    if (movedPastTouchTolerance(event, activeTouchPress)) {
      activeTouchPress.canceled = true;
      clearActiveTouchTimer();
    }
  }

  function handleTouchPointerUp(event, board) {
    if (!activeTouchPress || event.pointerId !== activeTouchPress.pointerId) {
      return;
    }

    event.preventDefault();
    suppressSyntheticMousePress();

    const touchPress = activeTouchPress;
    clearActiveTouchTimer();
    activeTouchPress = null;
    releaseTouchPointer(board, event.pointerId);

    if (
      touchPress.canceled ||
      touchPress.longTapped ||
      movedPastTouchTolerance(event, touchPress)
    ) {
      return;
    }

    const position = pointerPositionFromEvent(event);
    const releasedSquare = position
      ? findSquareAtPosition(position.x, position.y)
      : null;

    if (releasedSquare === touchPress.square) {
      tapSquare(touchPress.square);
    }
  }

  function handleTouchPointerCancel(event, board) {
    if (!activeTouchPress || event.pointerId !== activeTouchPress.pointerId) {
      return;
    }

    suppressSyntheticMousePress();
    cancelActiveTouchPress();
    releaseTouchPointer(board, event.pointerId);
  }

  function bindBoardPointerEvents() {
    const board = document.getElementById('board');

    if (!board) {
      return;
    }

    board.addEventListener('pointerdown', event => {
      if (handleTouchPointerDown(event, board)) {
        return;
      }

      if (event.button !== 0 || gameFinished || isModalOpen() || isFlagMode()) {
        return;
      }

      const position = pointerPositionFromEvent(event);
      if (!position) {
        return;
      }

      const square = findSquareAtPosition(position.x, position.y);
      if (square?.opened && !square.flagged) {
        chordSquareFromInput(square);
      }
    });

    board.addEventListener('pointermove', handleTouchPointerMove);
    board.addEventListener('pointerup', event =>
      handleTouchPointerUp(event, board)
    );
    board.addEventListener('pointercancel', event =>
      handleTouchPointerCancel(event, board)
    );
  }

  function mousePressed() {
    if (shouldIgnoreMousePressed()) {
      return false;
    }

    // Disable click if modal is open
    if (isModalOpen()) {
      return;
    }

    // Chord
    if (window.mouseButton === window.CENTER) {
      if (!gameFinished) {
        let square = findSquareAtPointer();

        if (square) {
          chordSquareFromInput(square);
        }
      }
    }

    // Flags
    if (window.mouseButton === window.RIGHT || isFlagMode()) {
      // Find the square the player clicked on
      let square = findSquareAtPointer();
      flagSquare(square);
    }

    // Find the square pressed on
    if (window.mouseButton === window.LEFT && !isFlagMode()) {
      if (!gameFinished) {
        let square = findSquareAtPointer();
        openSquareFromInput(square);
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
      recordElapsedTime();
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

    const endTime = new Date();
    time = startTime ? (endTime - startTime) / 1000 : timePassed;

    if (window.location.hash === '') {
      if (window.statsStore.hasBestMoves(level, moves)) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestMoves = true;
      }

      if (window.statsStore.hasBestTime(level, time)) {
        const header = document.getElementById('header');
        header.style.color = '#ffaf2e';
        NUMBERS[0] = BEST;
        newBestTime = true;
      }
    }
    stopTimer = true;
    if (timerInterval) clearInterval(timerInterval); // Stop the timer

    const header = document.getElementById('header');
    ensureHeaderCanDance(header);
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

  function ensureHeaderCanDance(header) {
    if (!header || header.querySelector('span')) {
      return;
    }

    const titleCharacters = Array.from(header.textContent);
    header.innerHTML = '';

    titleCharacters.forEach((character, index) => {
      const span = document.createElement('span');
      span.style.setProperty('--i', index);
      span.textContent = character === ' ' ? '\u00a0' : character;
      header.appendChild(span);
    });
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
      (window.keyCode === 49 || window.keyCode === 97) &&
      window.location.hash !== '#debug' &&
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('beginner');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'beginner' } })
      );
    }
    if (
      (window.keyCode === 50 || window.keyCode === 98) &&
      window.location.hash !== '#debug' &&
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('intermediate');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'intermediate' } })
      );
    }
    if (
      (window.keyCode === 51 || window.keyCode === 99) &&
      window.location.hash !== '#debug' &&
      window.localStorage.getItem('modalOpen') !== 'true'
    ) {
      setLevel('expert');
      document.dispatchEvent(
        new CustomEvent('levelChanged', { detail: { level: 'expert' } })
      );
    }

    // New Game
    if (window.keyCode === 78) {
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
    const height = board.length;
    const width = board[0]?.length ?? 0;
    const cells = [];

    // Initialize cells with the given board
    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        row.push({
          x,
          y,
          number: board[y][x] === 1 ? -1 : 0,
          group: 0,
        });
      }
      cells.push(row);
    }

    // Function to get surrounding cells
    function arround(cell) {
      const result = [];
      for (
        let x = Math.max(0, cell.x - 1);
        x <= Math.min(width - 1, cell.x + 1);
        x++
      ) {
        for (
          let y = Math.max(0, cell.y - 1);
          y <= Math.min(height - 1, cell.y + 1);
          y++
        ) {
          result.push(cells[x][y]);
        }
      }
      return result;
    }

    // Calculate numbers for each cell
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const cell = cells[x][y];
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
