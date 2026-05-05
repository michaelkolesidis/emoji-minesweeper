/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function CustomModal() {
  if (window.cleanupCustomModalListeners) {
    window.cleanupCustomModalListeners();
  }

  // Custom Modal
  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'custom-modal');
  modal.innerHTML = '';

  // Columns
  const columnsSettings = document.createElement('div');
  columnsSettings.classList.add('custom-section');
  columnsSettings.innerHTML = `<img class="custom-label" src="emoji/svg/left-right_arrow_flat.svg" title="Columns"/>
  <input type="number" id="columns-input" class="custom-input" min="7" max="100" step="1" placeholder="9">`;
  modal.appendChild(columnsSettings);

  // Rows
  const rowsSettings = document.createElement('div');
  rowsSettings.classList.add('custom-section');
  rowsSettings.innerHTML = `<img class="custom-label" src="emoji/svg/up-down_arrow_flat.svg" title="Rows" />
  <input type="number" id="rows-input" class="custom-input" min="7" max="100" step="1" placeholder="9">`;
  modal.appendChild(rowsSettings);

  // Mines
  const mineSettings = document.createElement('div');
  mineSettings.classList.add('custom-section');
  const getTheme = () => window.localStorage.getItem('theme') ?? 'mine';
  const mineLabel = document.createElement('img');
  mineLabel.className = 'custom-label';
  mineLabel.title = 'Mines';
  mineLabel.src = themes[getTheme()].mine;
  const minesInput = document.createElement('input');
  minesInput.type = 'number';
  minesInput.id = 'mines-input';
  minesInput.className = 'custom-input';
  minesInput.min = '1';
  minesInput.step = '1';
  minesInput.placeholder = '10';
  mineSettings.append(mineLabel, minesInput);
  modal.appendChild(mineSettings);

  const savedColumns = parseInt(window.localStorage.getItem('columns'), 10);
  const savedRows = parseInt(window.localStorage.getItem('rows'), 10);
  const savedMines = parseInt(window.localStorage.getItem('mines'), 10);

  if (Number.isInteger(savedColumns)) {
    document.getElementById('columns-input').value = savedColumns;
  }
  if (Number.isInteger(savedRows)) {
    document.getElementById('rows-input').value = savedRows;
  }
  if (Number.isInteger(savedMines)) {
    minesInput.value = savedMines;
  }

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.id = 'custom-submit';
  submitButton.innerHTML = `Submit`;
  modal.appendChild(submitButton);

  // Submit Button Functionality
  submitButton.addEventListener('click', () => {
    const columns = readClampedInteger('columns-input', 9, 7, 100);
    window.localStorage.setItem('columns', columns);

    const rows = readClampedInteger('rows-input', 9, 7, 100);
    window.localStorage.setItem('rows', rows);

    const totalCells = columns * rows;
    const mines = readClampedInteger('mines-input', 10, 1, totalCells - 1);
    window.localStorage.setItem('mines', mines);

    if (window.localStorage.getItem('level') !== 'custom') {
      window.localStorage.setItem('level', 'custom');
    }

    window.emojiMinesweeper?.setLevel('custom');
    document.dispatchEvent(
      new CustomEvent('levelChanged', { detail: { level: 'custom' } })
    );
    document.dispatchEvent(new CustomEvent('customLevelSubmitted'));
  });

  // Handle theme changing
  const themeButton = document.getElementById('theme-button');
  const listenerController = new AbortController();

  const resetMineIcon = () => {
    mineLabel.src = themes[getTheme()].mine;
  };

  themeButton.addEventListener('click', resetMineIcon, {
    signal: listenerController.signal,
  });

  document.addEventListener(
    'keydown',
    event => {
      if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        resetMineIcon();
      }
    },
    { signal: listenerController.signal }
  );

  window.cleanupCustomModalListeners = () => {
    listenerController.abort();
    window.cleanupCustomModalListeners = null;
  };
}

function readClampedInteger(inputId, fallback, min, max) {
  const input = document.getElementById(inputId);
  const value = Number.parseInt(input.value, 10);
  const clampedValue = Number.isInteger(value)
    ? Math.min(Math.max(value, min), max)
    : fallback;

  input.value = clampedValue;
  return clampedValue;
}
