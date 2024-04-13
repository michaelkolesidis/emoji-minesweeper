/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function DonateButton() {
  // Button
  const donateButton = document.createElement("div");
  donateButton.setAttribute("id", "donate-button");
  donateButton.innerHTML = `
        <a href='https://ko-fi.com/R5R3DX0VQ' target='_blank'>
            <img
                height='36'
                style='border:0px;height:36px;margin-top:5px'
                src='https://storage.ko-fi.com/cdn/kofi1.png?v=3'
                border='0'
                alt='Buy Me a Coffee at ko-fi.com'
            />
        </a>`;

  return donateButton;
}
