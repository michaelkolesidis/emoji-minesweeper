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
  minesInput.step = '1';
  minesInput.placeholder = '10';
  minesInput.title = 'Mines must be at least 10% of the level.';
  mineSettings.append(mineLabel, minesInput);
  modal.appendChild(mineSettings);

  const columnsInput = document.getElementById('columns-input');
  const rowsInput = document.getElementById('rows-input');
  const listenerController = new AbortController();
  const savedLevel = window.customLevelRules.readCustomLevel();
  columnsInput.value = savedLevel.columns;
  rowsInput.value = savedLevel.rows;
  minesInput.value = savedLevel.mines;

  const mineRequirement = document.createElement('p');
  mineRequirement.id = 'custom-mine-requirement';
  modal.appendChild(mineRequirement);

  function updateMineInputBounds() {
    const { columns, rows, minimumMines, maximumMines } =
      window.customLevelRules.normalizeCustomLevel({
        columns: columnsInput.value,
        rows: rowsInput.value,
      });

    minesInput.min = String(minimumMines);
    minesInput.max = String(maximumMines);
    minesInput.placeholder = String(Math.max(10, minimumMines));
    mineRequirement.textContent = `At least 10% of the board must be mines: ${minimumMines} minimum for ${columns}x${rows}.`;

    const mines = Number.parseInt(minesInput.value, 10);
    if (Number.isInteger(mines) && mines < minimumMines) {
      minesInput.value = minimumMines;
    } else if (Number.isInteger(mines) && mines > maximumMines) {
      minesInput.value = maximumMines;
    }
  }

  updateMineInputBounds();
  columnsInput.addEventListener('input', updateMineInputBounds, {
    signal: listenerController.signal,
  });
  rowsInput.addEventListener('input', updateMineInputBounds, {
    signal: listenerController.signal,
  });

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.id = 'custom-submit';
  submitButton.innerHTML = `Submit`;
  modal.appendChild(submitButton);

  // Submit Button Functionality
  submitButton.addEventListener('click', () => {
    const customLevel = window.customLevelRules.normalizeCustomLevel({
      columns: columnsInput.value,
      rows: rowsInput.value,
      mines: minesInput.value,
    });
    window.customLevelRules.saveCustomLevel(customLevel);
    columnsInput.value = customLevel.columns;
    rowsInput.value = customLevel.rows;
    minesInput.value = customLevel.mines;
    updateMineInputBounds();

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
