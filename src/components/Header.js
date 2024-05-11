/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function Header(title) {
  const header = document.createElement('div');
  header.id = `header`;
  header.classList.add('header');
  if (JSON.parse(localStorage.getItem('japanese')) === true) {
    header.classList.add('japanese');
  }

  const titleCharacters = title.split('');
  for (let i = 0; i < titleCharacters.length; i++) {
    if (titleCharacters[i] === ' ') {
      titleCharacters[i] = '&nbsp;';
    }
    header.innerHTML += `<span style="--i:${i}">${titleCharacters[i]}</span>`;
  }

  return header;
}
