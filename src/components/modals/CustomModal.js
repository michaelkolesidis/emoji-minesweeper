/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function CustomModal() {
  // Modal
  const customModal = document.createElement('div');
  customModal.classList.add('modal');
  customModal.setAttribute('id', 'custom-modal');

  // Columns
  const columnsSettings = document.createElement('div');
  columnsSettings.classList.add('custom-section');
  columnsSettings.innerHTML = `<img class="custom-label" src="../../../emoji/svg/left-right_arrow_flat.svg" title="Columns "/>
  <input type="text" id="columns-input" class="custom-input" placeholder="7-52">`;
  customModal.appendChild(columnsSettings);

  // Rows
  const rowsSettings = document.createElement('div');
  rowsSettings.classList.add('custom-section');
  rowsSettings.innerHTML = `<img class="custom-label" src="../../../emoji/svg/up-down_arrow_flat.svg" title="Rows" />
  <input type="text" id="rows-input" class="custom-input" placeholder="7-52">`;
  customModal.appendChild(rowsSettings);

  // Mines
  const mineSettings = document.createElement('div');
  mineSettings.classList.add('custom-section');
  mineSettings.innerHTML = `<img class="custom-label" src="../../${themes[theme].mine}" title="Mines"/>
  <input type="text" id="mines-input" class="custom-input">`;
  customModal.appendChild(mineSettings);

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.id = 'custom-submit';
  submitButton.innerHTML = `Submit`;
  customModal.appendChild(submitButton);

  // Submit Button Functionality
  submitButton.addEventListener('click', () => {
    let columns = document.getElementById('columns-input').value;
    let rows = document.getElementById('rows-input').value;
    let mines = document.getElementById('mines-input').value;

    if (isNaN(columns)) {
      columns = 9;
    } else {
      if (columns < 7) {
        columns = 7;
      } else if (columns > 52) {
        columns = 52;
      }
    }
    localStorage.setItem('columns', columns);

    if (isNaN(rows)) {
      rows = 9;
    } else {
      if (rows < 7) {
        rows = 7;
      } else if (rows > 52) {
        rows = 52;
      }
    }
    localStorage.setItem('rows', rows);

    if (isNaN(mines)) {
      mines = 10;
    } else {
      if (mines < 1) {
        mines = 1;
      }
      if (mines > columns * rows - 1) {
        mines = columns * rows - 1;
      }
    }
    localStorage.setItem('mines', mines);

    if (level !== 'custom') {
      localStorage.setItem('level', 'custom');
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

  return customModal;
}
