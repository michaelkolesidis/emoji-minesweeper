/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import { setLevel } from '../../utils/levelUtils.js';
import {
  isMobileDevice,
  showDesktopOnlyTooltip,
} from '../../utils/mobileTooltip.js';

export default function IntermediateButton() {
  // Button Creation
  const intermediateButton = document.createElement('div');
  intermediateButton.title = `Intermediate level`;
  intermediateButton.className = `emoji-button mobile-desktop-only`;
  intermediateButton.dataset.level = 'intermediate';
  intermediateButton.innerHTML = `<img src="emoji/keycap_2_flat.png" />`;
  const level = window.localStorage.getItem('level');

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

    const level = window.localStorage.getItem('level');

    if (level !== 'intermediate') {
      setLevel('intermediate');
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    if (isMobileDevice()) return;

    const level = window.localStorage.getItem('level');
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
