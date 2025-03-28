/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function CustomModal() {
  // Custom Modal
  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'custom-modal');
  modal.innerHTML = '';

  // Columns
  const columnsSettings = document.createElement('div');
  columnsSettings.classList.add('custom-section');
  columnsSettings.innerHTML = `<img class="custom-label" src="../../../emoji/svg/left-right_arrow_flat.svg" title="Columns "/>
  <input type="text" id="columns-input" class="custom-input" placeholder="7-100">`;
  modal.appendChild(columnsSettings);

  // Rows
  const rowsSettings = document.createElement('div');
  rowsSettings.classList.add('custom-section');
  rowsSettings.innerHTML = `<img class="custom-label" src="../../../emoji/svg/up-down_arrow_flat.svg" title="Rows" />
  <input type="text" id="rows-input" class="custom-input" placeholder="7-100">`;
  modal.appendChild(rowsSettings);

  // Mines
  const mineSettings = document.createElement('div');
  mineSettings.classList.add('custom-section');
  mineSettings.innerHTML = `<img class="custom-label" src="../../${themes[theme].mine}" title="Mines"/>
  <input type="text" id="mines-input" class="custom-input">`;
  modal.appendChild(mineSettings);

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.id = 'custom-submit';
  submitButton.innerHTML = `Submit`;
  modal.appendChild(submitButton);

  // Submit Button Functionality
  submitButton.addEventListener('click', () => {
    let columns = document.getElementById('columns-input').value;
    let rows = document.getElementById('rows-input').value;
    let mines = document.getElementById('mines-input').value;

    if (!columns) {
      columns = 9;
    } else {
      if (columns < 7) {
        columns = 7;
      } else if (columns > 100) {
        columns = 100;
      }
    }
    window.localStorage.setItem('columns', columns);

    if (!rows) {
      rows = 9;
    } else {
      if (rows < 7) {
        rows = 7;
      } else if (rows > 100) {
        rows = 100;
      }
    }
    window.localStorage.setItem('rows', rows);

    const totalCells = columns * rows;
    const minMinePercentage = 0.025;
    const largeMinMinePercentage = 0.1;

    const minMines = Math.ceil(totalCells * minMinePercentage);
    const largeMinMines = Math.ceil(totalCells * largeMinMinePercentage);

    if (!mines) {
      mines = 10;
    } else {
      if (totalCells > 3600) {
        if (mines < largeMinMines) {
          mines = largeMinMines;
        }
      } else {
        if (mines < minMines) {
          mines = minMines;
        }
      }

      const maxMines = Math.floor(totalCells * 0.8); // Mines can be up to 80% of the board

      if (mines > maxMines) {
        mines = maxMines;
      }
    }
    window.localStorage.setItem('mines', mines);

    if (level !== 'custom') {
      window.localStorage.setItem('level', 'custom');
    }

    window.location.reload();
  });

  // Handle theme changing
  const themeButton = document.getElementById('theme-button');

  const resetMineIcon = () =>
    (mineSettings.innerHTML = `<img class="custom-label" src="../../${themes[theme].mine}" title="Mines"/>
  <input type="text" id="mines-input" class="custom-input">`);

  themeButton.addEventListener('click', () => {
    resetMineIcon();
  });

  document.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
      resetMineIcon();
    }
  });
}
