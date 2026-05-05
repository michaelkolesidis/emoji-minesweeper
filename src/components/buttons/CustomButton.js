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

export default function CustomButton() {
  // Button Creation
  const customButton = document.createElement('div');
  customButton.title = `Custom level`;
  customButton.className = `emoji-button mobile-desktop-only`;
  customButton.dataset.level = 'custom';
  customButton.innerHTML = `<img src="emoji/keycap_asterisk_flat.png" />`;
  const level = window.localStorage.getItem('level');

  if (level === 'custom') {
    customButton.classList.add('emoji-button-clicked');
  }

  //  Click Functionality
  customButton.addEventListener(
    'click',
    e => {
      if (isMobileDevice()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showDesktopOnlyTooltip(customButton);
        return false;
      }
    },
    true
  );

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    // Ignore keyboard shortcuts on mobile devices
    if (isMobileDevice()) return;

    const level = window.localStorage.getItem('level');
    const modalOpen = window.localStorage.getItem('modalOpen');
    if (
      e.code === 'Digit4' &&
      level !== 'custom' &&
      modalOpen !== 'true'
    ) {
      setLevel('custom');
    }
  });

  return customButton;
}
