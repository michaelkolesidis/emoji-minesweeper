/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function Footer() {
  const footer = document.createElement("footer");
  footer.innerHTML += `
    <p>© 2024 Michael Kolesidis. Licensed under the 
      <a 
        href="https://www.gnu.org/licenses/agpl-3.0.html" 
        target="_blank">
          GNU AGPL
      </a>
       | 
      <a 
        href="https://github.com/michaelkolesidis/emoji-minesweeper" 
        target="_blank">
          GitHub
      </a>
    </p>`;

  return footer;
}
