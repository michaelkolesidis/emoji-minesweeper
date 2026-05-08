/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import { setLevel, shouldIgnoreLevelShortcut } from '../../utils/levelUtils.js';
import {
  isMobileDevice,
  showDesktopOnlyTooltip,
} from '../../utils/mobileTooltip.js';

export default function ExpertButton() {
  //  Button Creation
  const expertButton = document.createElement('div');
  expertButton.title = `Expert level`;
  expertButton.setAttribute('aria-label', 'Expert level');
  expertButton.className = `emoji-button mobile-desktop-only`;
  expertButton.dataset.level = 'expert';
  expertButton.innerHTML = `<img src="emoji/keycap_3_flat.png" alt="Expert level" />`;
  const level = window.localStorage.getItem('level');

  if (level === 'expert') {
    expertButton.classList.add('emoji-button-clicked');
  }

  // Click Event
  expertButton.addEventListener('click', e => {
    if (isMobileDevice()) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showDesktopOnlyTooltip(expertButton);
      return;
    }

    const level = window.localStorage.getItem('level');

    if (level !== 'expert') {
      setLevel('expert');
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    if (isMobileDevice() || shouldIgnoreLevelShortcut(e)) return;

    const level = window.localStorage.getItem('level');
    const modalOpen = window.localStorage.getItem('modalOpen');
    if (e.code === 'Digit3' && level !== 'expert' && modalOpen !== 'true') {
      setLevel('expert');
    }
  });

  return expertButton;
}
