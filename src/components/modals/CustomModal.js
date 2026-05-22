/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

import { getMatchingStandardLevel, setLevel } from '../../utils/levelUtils.js';

import { themes } from '../../themes.js';
import { preloadImage } from '../../utils/assetPreloader.js';

const columnsLabel = createPersistentLabel(
  'emoji/svg/left-right_arrow_flat.svg',
  'Columns'
);
const rowsLabel = createPersistentLabel(
  'emoji/svg/up-down_arrow_flat.svg',
  'Rows'
);
const mineLabel = createPersistentLabel(null, 'Mines');
const blankIcon =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

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
  const columnsInput = createNumberInput('columns-input', '9');
  columnsSettings.append(columnsLabel, columnsInput);
  modal.appendChild(columnsSettings);

  // Rows
  const rowsSettings = document.createElement('div');
  rowsSettings.classList.add('custom-section');
  const rowsInput = createNumberInput('rows-input', '9');
  rowsSettings.append(rowsLabel, rowsInput);
  modal.appendChild(rowsSettings);

  // Mines
  const mineSettings = document.createElement('div');
  mineSettings.classList.add('custom-section');
  const getTheme = () => window.localStorage.getItem('theme') ?? 'mine';
  resetMineIcon();
  const minesInput = document.createElement('input');
  minesInput.type = 'number';
  minesInput.id = 'mines-input';
  minesInput.className = 'custom-input';
  minesInput.step = '1';
  minesInput.placeholder = '12';
  minesInput.title = 'Mines must be at least 10% of the level.';
  mineSettings.append(mineLabel, minesInput);
  modal.appendChild(mineSettings);

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
    mineRequirement.replaceChildren(
      'At least ',
      strong('10%'),
      ' of the board must be mines: ',
      strong(String(minimumMines)),
      ' minimum for ',
      strong(`${columns}x${rows}`),
      '.'
    );

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

    const matchingLevel = getMatchingStandardLevel(customLevel);
    if (matchingLevel !== null) {
      setLevel(matchingLevel);
      document.dispatchEvent(new CustomEvent('customLevelSubmitted'));
      return;
    }

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

  function resetMineIcon() {
    setLabelFromThemeButton(mineLabel, themes[getTheme()].mine);
  }

  themeButton?.addEventListener('click', resetMineIcon, {
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

function strong(text) {
  const element = document.createElement('span');
  element.style.fontWeight = '900';
  element.textContent = text;
  return element;
}

function createPersistentLabel(src, title) {
  const label = src ? preloadImage(src, title) : document.createElement('img');
  label.className = 'custom-label';
  label.title = title;
  label.alt = title;

  if (src) {
    convertLabelToDataUrlWhenReady(label);
  }

  return label;
}

function createNumberInput(id, placeholder) {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = id;
  input.className = 'custom-input';
  input.min = '7';
  input.max = '100';
  input.step = '1';
  input.placeholder = placeholder;
  return input;
}

function setLabelFromThemeButton(label, fallbackSrc) {
  const themeIcon = document.querySelector('#theme-button img');
  const dataUrl = imageDataUrl(themeIcon);

  if (!dataUrl && themeIcon) {
    themeIcon.addEventListener(
      'load',
      () => setLabelFromThemeButton(label, fallbackSrc),
      { once: true }
    );
  }

  if (dataUrl) {
    label.src = dataUrl;
  } else if (!label.getAttribute('src')) {
    label.src = blankIcon;
  }

  label.dataset.sourceSrc = themeIcon?.getAttribute('src') ?? fallbackSrc;
}

function convertLabelToDataUrlWhenReady(label) {
  const convert = () => {
    const dataUrl = imageDataUrl(label);

    if (dataUrl) {
      label.src = dataUrl;
    }
  };

  if (label.complete) {
    convert();
    return;
  }

  label.addEventListener('load', convert, { once: true });
}

function imageDataUrl(image) {
  if (!image?.complete || image.naturalWidth === 0 || image.naturalHeight === 0) {
    return null;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas
      .getContext('2d')
      .drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}
