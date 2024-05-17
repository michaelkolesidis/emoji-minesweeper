/*
 *  Emoji Minesweeper
 *  Copyright (c) 2025 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

export default function HelpModal() {
  let gameLevel = window.localStorage.getItem('level');

  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'help-modal');
  modal.innerHTML = '';

  if (gameLevel === 'custom') {
    if (settings.level.rows === 7) {
      modal.style.top = '-280px';
    } else if (settings.level.rows === 8) {
      modal.style.top = '-313px';
    }
  }

  modal.innerHTML = `
<p>Left-click to <span style="font-weight:900;">open</span>, right-click to <span style="font-weight:900;">flag</span> and middle-click for <span style="font-weight:900;">chording</span></p>
<p>
  <img src="../../emoji/svg/new_button_flat.svg" class="help-emoji" />
  Start a <span style="font-weight:900;">new game</span> (N key)
</p>
<p>
  <img src="../../emoji/keycap_1_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_2_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_3_flat.png" class="help-emoji" />
  <img src="../../emoji/keycap_asterisk_flat.png" class="help-emoji" />
  Switch <span style="font-weight:900;">level</span>: beginner, inter., expert, custom (keys 1-4)
</p>
<p>
  <img src="../../emoji/svg/bar_chart_flat.svg" class="help-emoji" />
  Toggle <span style="font-weight:900;">stats</span> modal (S key)
</p>
<p>
  <img src="../../emoji/bomb_flat.png" class="help-emoji" />
  Switch <span style="font-weight:900;">theme</span> (left/right arrows)
</p>
<p>
  <img src="../../emoji/white_question_mark_flat.png" class="help-emoji" />
  Toggle <span style="font-weight:900;">help modal</span> (H key)
</p>
<p>
  <img src="../../emoji/triangular_flag_flat.png" class="help-emoji" />
  <span style="font-weight:900;">Touch</span> to flag (F key)
</p>
<p>
  <img src="../../emoji/sun_flat.png" class="help-emoji" />
  <span style="font-weight:900;">Dark theme</span> (D key)
</p>
<div id="about">
    <p>© 2025 Michael Kolesidis</p>
    <a
      href="https://github.com/michaelkolesidis/emoji-minesweeper" 
      target="_blank">
      GitHub
    </a>
</div>
`;
}
