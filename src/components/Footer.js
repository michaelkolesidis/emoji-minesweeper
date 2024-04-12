/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function Footer() {
  const footer = document.createElement("footer");
  footer.innerHTML += `
    <img src="../../assets/wordmark.svg" style="width: 140px;"/>
    <p>© 2024 Michael Kolesidis • 
      <a 
        href="https://github.com/michaelkolesidis/emoji-minesweeper" 
        target="_blank">
          Source
      </a>
    </p>`;

  return footer;
}
