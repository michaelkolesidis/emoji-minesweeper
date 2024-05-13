/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function DonateButton() {
  // Button
  const donateButton = document.createElement('div');
  donateButton.setAttribute('id', 'donate-button');
  donateButton.innerHTML = `
        <a href='https://ko-fi.com/R5R3DX0VQ' target='_blank'>
            <img
                style='border:0px;height:42px;margin-top:2px;'
                src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
                border='0'
                alt='Buy Me a Coffee at ko-fi.com'
            />
        </a>`;

  return donateButton;
}
