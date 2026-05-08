/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function Header(title) {
  const header = document.createElement('div');
  header.id = `header`;
  header.classList.add('header');
  if (JSON.parse(window.localStorage.getItem('japanese')) === true) {
    header.classList.add('japanese');
  }

  renderHeaderTitle(header, title);

  return header;
}

export function renderHeaderTitle(header, title) {
  header.innerHTML = '';

  const titleCharacters = Array.from(title);
  for (let i = 0; i < titleCharacters.length; i++) {
    const character =
      titleCharacters[i] === ' ' ? '\u00a0' : titleCharacters[i];
    const span = document.createElement('span');
    span.style.setProperty('--i', i);
    span.textContent = character;
    header.appendChild(span);
  }
}
