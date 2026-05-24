/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export default function HelpModal() {
  const modal = document.querySelector('.modal');
  modal.setAttribute('id', 'help-modal');
  modal.replaceChildren(...getHelpContent());
  positionHelpModal(modal);
}

function getHelpContent() {
  const variant = usesMobileControls() ? 'mobile' : 'desktop';

  return variant === 'mobile'
    ? buildMobileHelpContent()
    : buildDesktopHelpContent();
}

function usesMobileControls() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export function preloadHelpModalAssets() {
  // Help uses clones of already-rendered toolbar icons.
}

function buildDesktopHelpContent() {
  const content = [];

  content.push(
    paragraph(
      strong('Left-click'),
      ' to open or chord, ',
      strong('right-click'),
      ' to flag'
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
      ': beginner, inter., expert, custom (keys 1-4, 5 opens custom modal)'
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
      buttonIcon('Change theme', 'emoji/bomb_flat.png'),
      'Switch ',
      strong('theme'),
      ' (left/right arrows, right-click opens theme modal)'
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
      buttonIcon(['Mute sound', 'Unmute sound'], 'emoji/speaker_flat.png'),
      'Toggle ',
      strong('sound'),
      ' (M key)'
    )
  );

  content.push(
    paragraph(
      buttonIcon('Toggle dark mode', 'emoji/sun_flat.png'),
      strong('Dark theme'),
      ' (D key)'
    )
  );

  content.push(
    paragraph(
      strong('Keyboard mode'),
      ': K to ',
      strong('toggle'),
      ', number + Enter ',
      strong('open/chord'),
      ', number + F ',
      strong('flags')
    )
  );

  content.push(buildAbout());
  return content;
}

function buildMobileHelpContent() {
  const content = [];

  content.push(
    paragraph(
      strong('Tap'),
      ' to open a square, ',
      strong('long press'),
      ' to flag or unflag. ',
      strong('Tap'),
      ' an open numbered square to ',
      strong('chord'),
      ' when its flags match the number'
    )
  );

  content.push(
    paragraph(
      icon('emoji/svg/new_button_flat.svg'),
      'Start a ',
      strong('new game')
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
      ': beginner, inter., expert, custom'
    )
  );

  content.push(
    paragraph(icon('emoji/svg/bar_chart_flat.svg'), 'Toggle ', strong('stats'))
  );

  content.push(
    paragraph(
      buttonIcon('Change theme', 'emoji/bomb_flat.png'),
      'Switch ',
      strong('theme'),
      ' (tap; long press chooses)'
    )
  );

  content.push(
    paragraph(
      icon('emoji/white_question_mark_flat.png'),
      'Toggle ',
      strong('help modal')
    )
  );

  content.push(
    paragraph(
      buttonIcon(['Mute sound', 'Unmute sound'], 'emoji/speaker_flat.png'),
      'Toggle ',
      strong('sound')
    )
  );

  content.push(
    paragraph(
      buttonIcon('Toggle dark mode', 'emoji/sun_flat.png'),
      strong('Dark theme')
    )
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
  const element = helpIconFromToolbarSrc(src);
  element.className = 'help-emoji';
  element.alt = '';
  return element;
}

function buttonIcon(ariaLabels, fallbackSrc) {
  const element =
    helpIconFromToolbarAria(ariaLabels) ?? helpIconFromToolbarSrc(fallbackSrc);
  element.className = 'help-emoji';
  element.alt = '';
  return element;
}

function helpIconFromToolbarSrc(src) {
  const icon = document.querySelector(
    `#emoji-buttons-container .emoji-button img[src="${src}"]`
  );

  return createNetworkFreeHelpIcon(icon, src);
}

function helpIconFromToolbarAria(ariaLabels) {
  const labels = Array.isArray(ariaLabels) ? ariaLabels : [ariaLabels];

  for (const label of labels) {
    const icon = document
      .querySelector(
        `#emoji-buttons-container .emoji-button[aria-label="${label}"]`
      )
      ?.querySelector('img');

    if (icon) {
      return createNetworkFreeHelpIcon(icon, icon.getAttribute('src'));
    }
  }

  return null;
}

function createNetworkFreeHelpIcon(toolbarIcon, fallbackSrc) {
  const helpIcon = document.createElement('img');

  if (!toolbarIcon) {
    helpIcon.src = fallbackSrc;
    return helpIcon;
  }

  const dataUrl = imageDataUrl(toolbarIcon);
  helpIcon.src = dataUrl ?? toolbarIcon.currentSrc ?? toolbarIcon.src;
  helpIcon.dataset.sourceSrc = toolbarIcon.getAttribute('src') ?? fallbackSrc;
  return helpIcon;
}

function imageDataUrl(image) {
  if (
    !image.complete ||
    image.naturalWidth === 0 ||
    image.naturalHeight === 0
  ) {
    return null;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas
      .getContext('2d')
      .drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

function buildAbout() {
  const about = document.createElement('div');
  about.id = 'about';

  const credit = document.createElement('p');
  credit.textContent = '© Michael Kolesidis';

  const links = document.createElement('div');
  links.id = 'help-links';

  const source = document.createElement('a');
  source.id = 'source';
  source.href = 'https://github.com/michaelkolesidis/emoji-minesweeper';
  source.target = '_blank';
  source.textContent = 'Source';

  const help = document.createElement('a');
  help.href = '/emoji-minesweeper/help';
  help.target = '_blank';
  help.textContent = 'Help';

  links.append(source, document.createTextNode('    '), help);
  about.append(credit, links);
  return about;
}
