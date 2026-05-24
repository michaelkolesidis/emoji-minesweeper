/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 *
 *  themeButton.js contains all the theme
 *  button functionality, the button,
 *  the utility functions and the keyboard
 *  event handling.
 */

import { renderHeaderTitle } from '../Header.js';

import { themes } from '../../themes.js';
import {
  preloadImage,
  scheduleAfterInitialRender,
} from '../../utils/assetPreloader.js';

const themeIconCache = new Map();
const themeIconDataUrlCache = new Map();

export default function ThemeButton(header) {
  // Button
  const themeButton = document.createElement('div');
  themeButton.title = `Change theme`;
  themeButton.setAttribute('aria-label', 'Change theme');
  themeButton.id = `theme-button`;
  themeButton.className = `emoji-button`;
  let theme = window.localStorage.getItem('theme') ?? 'mine';
  let longPressTimerId = null;
  let suppressNextClick = false;
  renderThemeIcon();
  preloadRemainingThemeIcons();

  // Theme Button Functionality
  themeButton.addEventListener('click', event => {
    if (suppressNextClick) {
      suppressNextClick = false;
      return;
    }

    event.stopPropagation();
    closeThemePicker();
    switchTheme();
  });

  themeButton.addEventListener('contextmenu', event => {
    event.preventDefault();
    toggleThemePicker();
  });

  // Utility Functions for Switching Themes
  function switchTheme() {
    const themeKeys = Object.keys(themes);
    let currentThemeIndex = themeKeys.indexOf(theme);

    // Switch to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
    theme = themeKeys[currentThemeIndex];
    window.localStorage.setItem('theme', theme);

    updateTheme();
  }

  function switchThemeReverse() {
    const themeKeys = Object.keys(themes);
    let currentThemeIndex = themeKeys.indexOf(theme);

    // Switch to previous theme
    currentThemeIndex =
      (currentThemeIndex - 1 + themeKeys.length) % themeKeys.length;
    theme = themeKeys[currentThemeIndex];
    window.localStorage.setItem('theme', theme);

    updateTheme();
  }

  function selectTheme(nextTheme) {
    theme = nextTheme;
    window.localStorage.setItem('theme', theme);
    updateTheme();
    closeThemePicker();
  }

  function updateTheme() {
    window.emojiMinesweeper?.setTheme(theme);
    window.localStorage.setItem('mainEmoji', themes[theme].mine);
    syncJapaneseTitleClass();
    renderHeaderTitle(header, themes[theme].title);
    renderThemeIcon();
  }

  function syncJapaneseTitleClass() {
    const isJapaneseTheme = theme === 'japan';
    header.classList.toggle('japanese', isJapaneseTheme);
    window.localStorage.setItem('japanese', String(isJapaneseTheme));
  }

  function renderThemeIcon() {
    themeButton.replaceChildren(getThemeIcon(themes[theme]));
  }

  function getThemePicker() {
    return document.getElementById('theme-picker');
  }

  function closeThemePicker() {
    getThemePicker()?.remove();
    themeButton.classList.remove('theme-picker-open');
    document.removeEventListener('pointerdown', handleDocumentPointerDown);
    document.removeEventListener('keydown', handleThemePickerKeydown);
  }

  function toggleThemePicker() {
    if (getThemePicker()) {
      closeThemePicker();
      return;
    }

    openThemePicker();
  }

  function openThemePicker() {
    closeThemePicker();

    const picker = document.createElement('div');
    picker.id = 'theme-picker';
    picker.setAttribute('role', 'dialog');
    picker.setAttribute('aria-label', 'Choose theme');
    picker.addEventListener('pointerdown', suppressBoardMousePress);
    picker.addEventListener('click', suppressBoardMousePress);
    picker.addEventListener('contextmenu', event => {
      event.preventDefault();
      event.stopPropagation();
      suppressBoardMousePress();
    });

    Object.entries(themes).forEach(([themeKey, themeValue]) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'theme-picker-option';
      option.setAttribute('aria-label', `${themeValue.title} theme`);
      option.setAttribute('aria-pressed', String(themeKey === theme));
      option.appendChild(getThemeIcon(themeValue));
      option.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        suppressBoardMousePress();
        selectTheme(themeKey);
      });
      picker.appendChild(option);
    });

    themeButton.appendChild(picker);
    themeButton.classList.add('theme-picker-open');
    window.setTimeout(() => {
      document.addEventListener('pointerdown', handleDocumentPointerDown);
      document.addEventListener('keydown', handleThemePickerKeydown);
    }, 0);
  }

  function handleDocumentPointerDown(event) {
    if (!themeButton.contains(event.target)) {
      closeThemePicker();
    }
  }

  function handleThemePickerKeydown(event) {
    if (event.code === 'Escape') {
      closeThemePicker();
    }
  }

  function clearLongPressTimer() {
    if (longPressTimerId !== null) {
      window.clearTimeout(longPressTimerId);
      longPressTimerId = null;
    }
  }

  themeButton.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'touch') {
      return;
    }

    clearLongPressTimer();
    longPressTimerId = window.setTimeout(() => {
      suppressNextClick = true;
      openThemePicker();
    }, 200);
  });

  themeButton.addEventListener('pointermove', clearLongPressTimer);
  themeButton.addEventListener('pointerup', clearLongPressTimer);
  themeButton.addEventListener('pointercancel', clearLongPressTimer);

  // Keyboard Action Handling
  document.addEventListener('keydown', event => {
    // Switch Themes
    if (event.code === 'ArrowRight') {
      switchTheme();
    }

    if (event.code === 'ArrowLeft') {
      switchThemeReverse();
    }
  });

  return themeButton;
}

function suppressBoardMousePress(event) {
  event?.stopPropagation();
  window.emojiMinesweeper?.suppressNextMousePress?.();
}

function getThemeIcon(theme) {
  if (!themeIconCache.has(theme.mine)) {
    const icon = preloadImage(theme.mine);
    themeIconCache.set(theme.mine, icon);
    cacheThemeIconDataUrlWhenReady(icon, theme.mine);
  }

  const cachedDataUrl = themeIconDataUrlCache.get(theme.mine);
  const preloadedIcon = themeIconCache.get(theme.mine);
  const icon = document.createElement('img');
  icon.src = cachedDataUrl || preloadedIcon.currentSrc || preloadedIcon.src || theme.mine;
  icon.alt = `${theme.title} theme`;
  return icon;
}

function cacheThemeIconDataUrlWhenReady(icon, cacheKey) {
  if (themeIconDataUrlCache.has(cacheKey)) {
    return;
  }

  const cacheDataUrl = () => {
    const dataUrl = imageDataUrl(icon);

    if (dataUrl) {
      themeIconDataUrlCache.set(cacheKey, dataUrl);
    }
  };

  if (icon.complete && icon.naturalWidth > 0) {
    cacheDataUrl();
    return;
  }

  icon.addEventListener('load', cacheDataUrl, { once: true });
}

function imageDataUrl(image) {
  if (
    !image?.complete ||
    image.naturalWidth === 0 ||
    image.naturalHeight === 0
  ) {
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

function preloadRemainingThemeIcons() {
  scheduleAfterInitialRender('theme-button-icons', () => {
    Object.values(themes).forEach(theme => {
      getThemeIcon(theme);
    });
  });
}
