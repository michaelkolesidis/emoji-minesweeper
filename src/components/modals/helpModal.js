/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function HelpModal() {
  const helpModal = document.createElement('div');
  helpModal.classList.add('modal');
  helpModal.setAttribute('id', 'help-modal');
  helpModal.innerHTML += `
<p>Left-click to <span style="font-weight:600;">open</span>, right-click to <span style="font-weight:600;">flag</span></p>
<p>
  <img src="../../emoji/keycap_1_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_2_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_3_flat.png" class="help-emoji" />
  Switch <span style="font-weight:600;">level</span>: beginner, intermediate, expert (keys 1, 2, 3)
</p>
<p>
  <img src="../../emoji/bomb_flat.png" class="help-emoji" />
  Switch <span style="font-weight:600;">theme</span> (left/right arrows)
</p>
<p>
  <img src="../../emoji/white_question_mark_flat.png" class="help-emoji" />
  Toggle <span style="font-weight:600;">help modal</span> (H key)
</p>
<p>
  <img src="../../emoji/triangular_flag_flat.png" class="help-emoji" />
  <span style="font-weight:600;">Flag mode</span>: touch to flag (F key)
</p>
<p>
  <img src="../../emoji/sun_flat.png" class="help-emoji" />
  <span style="font-weight:600;">Dark theme</span> (D key)
</p>
<div id="about">
  <img id="moustache-man" src="../../assets/moustache_man.svg" />
    <p>© 2024 Michael Kolesidis</p>
    <a
      href="https://github.com/michaelkolesidis/emoji-minesweeper" 
      target="_blank">
      Source
    </a>
</div>
`;

  return helpModal;
}
