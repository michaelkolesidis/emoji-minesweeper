/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import { isMuted, toggleMuted } from '../../utils/audio.js';

const soundIcons = {
  muted: createSoundIcon('emoji/muted_speaker_flat.png', 'Sound muted'),
  unmuted: createSoundIcon('emoji/speaker_flat.png', 'Sound on'),
};

export default function MuteButton() {
  const muteButton = document.createElement('div');
  muteButton.className = 'emoji-button';

  function render() {
    const muted = isMuted();
    const icon = muted ? soundIcons.muted : soundIcons.unmuted;

    muteButton.replaceChildren(icon);
    muteButton.title = muted ? 'Unmute sound' : 'Mute sound';
    muteButton.setAttribute(
      'aria-label',
      muted ? 'Unmute sound' : 'Mute sound'
    );
    muteButton.setAttribute('aria-pressed', JSON.stringify(muted));
  }

  render();

  function toggleSound() {
    toggleMuted();
    render();
  }

  muteButton.addEventListener('click', toggleSound);

  document.addEventListener('keydown', event => {
    if (event.code === 'KeyM') {
      toggleSound();
    }
  });

  return muteButton;
}

function createSoundIcon(src, alt) {
  const icon = document.createElement('img');
  icon.src = src;
  icon.alt = alt;
  return icon;
}
