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
<div>
  <p>Left-click to <span style="font-weight:600;">open</span>, right-click to <span style="font-weight:600;">flag</span> a square</p>
  <hr>
  <p>
    <img src="../../emoji/keycap_1_flat.png" class="help-emoji" />
    <img src="../../emoji/keycap_2_flat.png" class="help-emoji" />
    <img src="../../emoji/keycap_3_flat.png" class="help-emoji" />
    Switch between <span style="font-weight:600;">levels</span>, beginner, intermediate, expert (or keys 1, 2, 3)
  </p>
  <hr>
  <p>
    <img src="../../emoji/bomb_flat.png" class="help-emoji" /> /
    <img src="../../emoji/hibiscus_flat.png" class="help-emoji" /> /
    <img src="../../emoji/mushroom_flat.png" class="help-emoji" /> /
    <img src="../../emoji/bear_flat.png" class="help-emoji" /> /
    <img src="../../emoji/person_surfing_flat_default.png" class="help-emoji" /> /
    <img src="../../emoji/japanese_castle_flat.png" class="help-emoji" />
    Switch between <span style="font-weight:600;">themes</span> (or left/right arrows)
  </p>
  <hr>
  <p>
    <img src="../../emoji/white_question_mark_flat.png" class="help-emoji" />
    Toggle <span style="font-weight:600;">help</span> (or H key)
  </p>
  <hr>
  <p>
    <img src="../../emoji/triangular_flag_flat.png" class="help-emoji" />
    Toggle <span style="font-weight:600;">flag mode</span>: flag with touch / right-click (or F key)
  </p>
  <hr>
  <p>
    <img src="../../emoji/sun_flat.png" class="help-emoji" /> /
    <img src="../../emoji/waning_crescent_moon_flat.png" class="help-emoji" />
    Toggle <span style="font-weight:600;">dark mode</span> (or D key)
  </p>
</div>
`;

  return helpModal;
}
