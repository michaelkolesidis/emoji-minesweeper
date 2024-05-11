/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function HelpModal() {
  let gameLevel = window.localStorage.getItem('level');

  const helpModal = document.createElement('div');
  helpModal.classList.add('modal');
  helpModal.setAttribute('id', 'help-modal');

  if (gameLevel === 'custom') {
    helpModal.style.alignItems = 'center';
    helpModal.style.justifyContent = 'center';

    helpModal.style.width = '8rem';
    helpModal.style.height = '100px';

    helpModal.style.top = '-237px';
    helpModal.style.left = '67.5px';
  }

  helpModal.innerHTML =
    gameLevel === 'custom'
      ? `<h3>Help not available in custom levels</h3>`
      : `
<p>Left-click to <span style="font-weight:600;">open</span>, right-click to <span style="font-weight:600;">flag</span></p>
<p>
  <img src="../../emoji/keycap_1_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_2_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_3_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_asterisk_flat.png" class="help-emoji" />
  Switch <span style="font-weight:600;">level</span>: beginner, inter., expert, custom (keys 1-4)
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
  <span style="font-weight:600;">Touch</span> to flag (F key)
</p>
<p>
  <img src="../../emoji/sun_flat.png" class="help-emoji" />
  <span style="font-weight:600;">Dark theme</span> (D key)
</p>
<div id="about">
  <img id="dog-face" src="../../emoji/svg/dog_face_flat.svg" />
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
