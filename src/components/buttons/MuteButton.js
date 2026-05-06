/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import { isMuted, toggleMuted } from '../../utils/audio.js';

export default function MuteButton() {
  const muteButton = document.getElementById('muteButton');

  const svgVolumeOn = `<svg class="mute-icon" width="60" height="46.074" version="1.1" viewBox="0 0 20 15.358" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <g transform="translate(0 -.32098)" stroke="currentColor" stroke-linecap="round">
  <path d="m8.5 1-5 4h-2c-0.6 0-1 0.4-1 1v4c0 0.6 0.4 1 1 1h2l5 4c0.6 0.4 1 0.1 1-0.5v-13c0-0.6-0.4-0.9-1-0.5z" fill="currentColor" stroke-linejoin="round"/>
  <path d="m13.476 4.2251q3.0263 3.7749 0 7.5497" fill="none" stroke-width="1.9514"/>
  <path d="m16.502 1.394q5.0438 6.606 0 13.212" fill="none" stroke-width="1.9514"/>
 </g>
</svg>`;

  const svgVolumeOff = `<svg class="mute-icon" width="60" height="46.074" version="1.1" viewBox="-2 -2 19.997 15.358" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
 <g transform="translate(0 1.8239e-5)" stroke="currentColor" stroke-linecap="round">
  <path d="m6.5-1.321-5 4h-2c-0.6 0-1 0.4-1 1v4c0 0.6 0.4 1 1 1h2l5 4c0.6 0.4 1 0.1 1-0.5v-13c0-0.6-0.4-0.9-1-0.5z" fill="currentColor" stroke-linejoin="round"/>
  <g transform="translate(.0775 -.036534)" stroke-width="2">
   <line x1="10.919" x2="16.919" y1="2.7155" y2="8.7155"/>
   <line x1="16.919" x2="10.919" y1="2.7155" y2="8.7155"/>
  </g>
 </g>
</svg>`;

  function render() {
    const muted = isMuted();
    muteButton.innerHTML = muted ? svgVolumeOff : svgVolumeOn;
    muteButton.title = muted ? 'Unmute sound' : 'Mute sound';
    muteButton.setAttribute(
      'aria-label',
      muted ? 'Unmute sound' : 'Mute sound'
    );
    muteButton.setAttribute('aria-pressed', JSON.stringify(muted));
  }

  if (muteButton) {
    render();

    muteButton.addEventListener('click', () => {
      toggleMuted();
      render();
    });
  }

  return muteButton;
}
