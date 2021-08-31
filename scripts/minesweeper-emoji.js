// ==============================================
// Minesweeper Emoji :D  
// ==============================================
// Created and maintained by Michael Kolesidis
// ==============================================
// v0.1-alpha
// ==============================================

// Board dimensions and number of mines
let rows = 10;
let cols = 10;
let cellW = 40;
let cellH = 40;
let cells = [];
let mineToCellRatio = 0.15;

// Emojis
const EMPTY = '🔲';
const MINE = '💣';
const FLAG = '🚩';
const DIGITS = ['⬜️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];

// Prevent right mouse click from opening browser context menu
document.addEventListener('contextmenu', event => event.preventDefault());

function setup() {
	background(249, 249, 249);
	createCanvas(cellW * rows, (cellH * cols)+100);
	textSize(cellH - 1);

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let newCell = new Cell(i, j);
			// Decide whether it is a mine or not
			newCell.mine = Math.random(0, 1) < mineToCellRatio;
			cells.push(newCell);
		}
	}

	// Set mines around each cell
	cells.forEach(c => {
		// Find neighboring cells
		let neighbors = getNeighbors(c);
		let reducer = (accumulator, currentValue) => accumulator + currentValue;
		c.minesAround = neighbors.map(n => n.mine).reduce(reducer); // Add all mine values to find total	
	});
}

function draw() {
	background(255);

	translate(1, cellH - 3);
	cells.forEach(function (c) {
		c.draw();
	});
}

function getNeighbors(cell) {
	return cells.filter(n => {
		return (n.i >= cell.i - 1) && (n.i <= cell.i + 1) && (n.j >= cell.j - 1) && (n.j <= cell.j + 1);
	});
}

function revealCell(cell) {
	cell.revealed = true;
	if (cell.mine) { // End game
		cells.forEach(c => {
			c.revealed = true;
		});
		noLoop();
		return;
	}
	if (cell.minesAround == 0) { // Recursively reveal neighbors
		let neighbors = getNeighbors(cell);
		neighbors.forEach(n => {
			if (!n.revealed) {
				revealCell(n);
			}
		});
	}
}

function gameWon() {
	DIGITS[0] = '😃';
	cells.forEach(function (c) {
		c.revealed = true;
	});
}

function gameLost() {
	DIGITS[0] = '😱';
	cells.forEach(function (c) {
		c.revealed = true;
	});
}

function mousePressed() {
	// Flags
	if (mouseButton === RIGHT) {
		// Find the cell pressed on
		let cell = cells.find(c => {
			return (c.x < mouseX) && (c.x + cellW > mouseX) && (c.y < mouseY) && (c.y + cellH > mouseY);
		});
		if (cell) {
			cell.flagged = !cell.flagged;
		}
	}

	// Find the cell pressed on
	if (mouseButton === LEFT) {
		let cell = cells.find(c => {
			return (c.x < mouseX) && (c.x + cellW > mouseX) && (c.y < mouseY) && (c.y + cellH > mouseY);
		});
		if (cell) {
			if (cell.flagged) {
				return; // Do not allow revealing
			}
			revealCell(cell);
			if (cell.mine) {
				gameLost();
			} else {
				// Check if game is won
				let cellsLeft = cells.filter(c => {
					return !c.mine && !c.revealed;
				}).length;
				if (cellsLeft == 0) {
					gameWon();
				}
			}
		}
	}
}
