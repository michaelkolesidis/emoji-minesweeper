/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import {
  getCurrentLevel,
  setLevel,
  shouldIgnoreLevelShortcut,
} from '../../utils/levelUtils.js';
import {
  isMobileDevice,
  showDesktopOnlyTooltip,
} from '../../utils/mobileTooltip.js';

export default function IntermediateButton() {
  // Button Creation
  const intermediateButton = document.createElement('div');
  intermediateButton.title = `Intermediate level`;
  intermediateButton.setAttribute('aria-label', 'Intermediate level');
  intermediateButton.className = `emoji-button mobile-desktop-only`;
  intermediateButton.dataset.level = 'intermediate';
  intermediateButton.innerHTML = `<img src="emoji/keycap_2_flat.png" alt="Intermediate level" />`;
  const level = getCurrentLevel();

  if (level === 'intermediate') {
    intermediateButton.classList.add('emoji-button-clicked');
  }

  // Click Event
  intermediateButton.addEventListener('click', e => {
    if (isMobileDevice()) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showDesktopOnlyTooltip(intermediateButton);
      return;
    }

    const level = getCurrentLevel();

    if (level !== 'intermediate') {
      setLevel('intermediate');
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    if (isMobileDevice() || shouldIgnoreLevelShortcut(e)) return;

    const level = getCurrentLevel();
    const modalOpen = window.localStorage.getItem('modalOpen');
    if (
      e.code === 'Digit2' &&
      level !== 'intermediate' &&
      modalOpen !== 'true'
    ) {
      setLevel('intermediate');
    }
  });

  return intermediateButton;
}
