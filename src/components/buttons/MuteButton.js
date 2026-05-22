/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

import { isMuted, toggleMuted } from '../../utils/audio.js';
import {
  preloadImage,
  scheduleAfterInitialRender,
} from '../../utils/assetPreloader.js';

const soundIconSources = {
  muted: { src: 'emoji/muted_speaker_flat.png', alt: 'Sound muted' },
  unmuted: { src: 'emoji/speaker_flat.png', alt: 'Sound on' },
};
const soundIcons = new Map();

export default function MuteButton() {
  const muteButton = document.createElement('div');
  muteButton.className = 'emoji-button';
  preloadRemainingSoundIcons();

  function render() {
    const muted = isMuted();
    const icon = getSoundIcon(muted ? 'muted' : 'unmuted');

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

function getSoundIcon(state) {
  if (!soundIcons.has(state)) {
    const { src, alt } = soundIconSources[state];
    soundIcons.set(state, preloadImage(src, alt));
  }

  return soundIcons.get(state);
}

function preloadRemainingSoundIcons() {
  scheduleAfterInitialRender('sound-button-icons', () => {
    Object.keys(soundIconSources).forEach(getSoundIcon);
  });
}
