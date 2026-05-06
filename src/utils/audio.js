/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

const AudioContextClass = window.AudioContext || window.webkitAudioContext;

const audioBuffers = {};
const audioVolumes = {
  pop: 0.15,
  flag: 0.1,
  win: 0.15,
  loss: 0.15,
};

let audioCtx = null;
let masterGain = null;
let muted = JSON.parse(window.localStorage.getItem('muted')) ?? false;

function getAudioContext() {
  if (!AudioContextClass) {
    return null;
  }

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = muted ? 0 : 1;
    masterGain.connect(audioCtx.destination);
  }

  return audioCtx;
}

async function loadSound(name, url) {
  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffers[name] = await ctx.decodeAudioData(arrayBuffer);
  } catch (error) {
    console.error(`Error loading sound ${name}:`, error);
  }
}

export function wakeAudio() {
  const ctx = getAudioContext();
  if (ctx?.state === 'suspended') {
    ctx.resume();
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(nextMuted) {
  muted = nextMuted;
  window.localStorage.setItem('muted', JSON.stringify(muted));

  if (masterGain) {
    masterGain.gain.value = muted ? 0 : 1;
  }

  if (!muted) {
    wakeAudio();
  }

  return muted;
}

export function toggleMuted() {
  return setMuted(!muted);
}

export function playSound(name) {
  const ctx = getAudioContext();
  const buffer = audioBuffers[name];

  if (!ctx || !buffer) {
    return;
  }

  wakeAudio();

  const source = ctx.createBufferSource();
  const gainNode = ctx.createGain();

  source.buffer = buffer;
  gainNode.gain.value = audioVolumes[name] ?? 1;

  source.connect(gainNode);
  gainNode.connect(masterGain);
  source.start(0);
}

loadSound('pop', 'sounds/pop.mp3');
loadSound('flag', 'sounds/flag.mp3');
loadSound('win', 'sounds/win.mp3');
loadSound('loss', 'sounds/loss.mp3');

window.emojiMinesweeperAudio = Object.freeze({
  isMuted,
  setMuted,
  toggleMuted,
  playSound,
  wakeAudio,
});
