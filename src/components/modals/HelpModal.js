/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

let cachedHelpContent = null;

export default function HelpModal() {
  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'help-modal');
  modal.replaceChildren(...getHelpContent());
  positionHelpModal(modal);
}

function getHelpContent() {
  if (cachedHelpContent === null) {
    cachedHelpContent = buildHelpContent();
  }

  return cachedHelpContent;
}

function buildHelpContent() {
  const content = [];

  content.push(
    paragraph(
      'Left-click to ',
      strong('open'),
      ', right-click to ',
      strong('flag'),
      ' and middle-click for ',
      strong('chording')
    )
  );

  content.push(
    paragraph(
      icon('emoji/svg/new_button_flat.svg'),
      'Start a ',
      strong('new game'),
      ' (N key)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/keycap_1_flat.png'),
      icon('emoji/keycap_2_flat.png'),
      icon('emoji/keycap_3_flat.png'),
      icon('emoji/keycap_asterisk_flat.png'),
      'Switch ',
      strong('level'),
      ': beginner, inter., expert, custom (keys 1-4)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/svg/bar_chart_flat.svg'),
      'Toggle ',
      strong('stats'),
      ' modal (S key)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/bomb_flat.png'),
      'Switch ',
      strong('theme'),
      ' (left/right arrows)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/white_question_mark_flat.png'),
      'Toggle ',
      strong('help modal'),
      ' (H key)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/triangular_flag_flat.png'),
      strong('Touch'),
      ' to flag (F key)'
    )
  );

  content.push(
    paragraph(icon('emoji/sun_flat.png'), strong('Dark theme'), ' (D key)')
  );

  content.push(buildAbout());
  return content;
}

function positionHelpModal(modal) {
  const gameLevel = window.localStorage.getItem('level');

  if (gameLevel !== 'custom') {
    return;
  }

  const rows = parseInt(window.localStorage.getItem('rows'), 10);

  if (rows === 7) {
    modal.style.top = '-280px';
  } else if (rows === 8) {
    modal.style.top = '-313px';
  }
}

function paragraph(...children) {
  const element = document.createElement('p');
  element.append(...children);
  return element;
}

function strong(text) {
  const element = document.createElement('span');
  element.style.fontWeight = '900';
  element.textContent = text;
  return element;
}

function icon(src) {
  const element = document.createElement('img');
  element.src = src;
  element.className = 'help-emoji';
  return element;
}

function buildAbout() {
  const about = document.createElement('div');
  about.id = 'about';

  const credit = document.createElement('p');
  credit.textContent = '© Michael Kolesidis';

  const links = document.createElement('div');
  links.id = 'help-links';

  const source = document.createElement('a');
  source.id = 'source'
  source.href = 'https://github.com/michaelkolesidis/emoji-minesweeper';
  source.target = '_blank';
  source.textContent = 'Source';

  const help = document.createElement('a');
  help.href = '/help';
  help.target = '_blank';
  help.textContent = 'Help';

  links.append(source, document.createTextNode('    '), help);
  about.append(credit, links);
  return about;
}
