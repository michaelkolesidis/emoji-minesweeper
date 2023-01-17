/*
 *  Emoji Minesweeper
 *  Copyright (c) 2023 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function HelpModal() {
  const helpModal = document.createElement("div");
  helpModal.setAttribute("id", "help-modal");
  helpModal.innerHTML += `
<div>
  🖱️ Left-click to <span style="font-weight:600;">open</span> a square, right-click to <span style="font-weight:600;">flag</span> a square
  <hr>
  1️⃣2️⃣3️⃣ Switch between <span style="font-weight:600;">levels</span>, beginner, intermediate, expert (or use ⌨️ keys 1, 2, 3)
  <hr>
  💣/🌺/🍄/🐻/🐙 Switch between <span style="font-weight:600;">themes</span> (or use ⌨️ left/right arrows)
  <hr>
  ❔ Toggle <span style="font-weight:600;">help</span> (or use ⌨️ the H key)
  <hr>
  🚩 Toggle <span style="font-weight:600;">flag mode</span>: flag with touch / right-click (or use ⌨️ the F key)
</div>
`;

  return helpModal;
}
