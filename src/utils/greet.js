/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export const greet = () => {
  const style = `
    background-color: #ededed;
    color: ##424242;
    font-weight: 900;
    margin: 10px 0;
    padding: 5px 10px;
    border: 5px solid #ededed;
    border-radius:60px;
    font-size: 2em;
    font-family: sans-serif
    `;

  console.log('%cEmoji Minesweeper 😄', style);
  console.log('© 2025 Michael Kolesidis | https://github.com/michaelkolesidis/emoji-minesweeper ');
};
