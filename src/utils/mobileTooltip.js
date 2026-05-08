/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

export function isMobileDevice() {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
}

export function showDesktopOnlyTooltip(anchorElement) {
  showTooltip(
    anchorElement,
    'Desktop only',
    'Use a wider screen for this level.'
  );
}

export function showTooltip(anchorElement, title, message) {
  const existingTooltip = document.querySelector('.mobile-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  anchorElement.blur?.();

  const tooltip = document.createElement('div');
  tooltip.className = 'mobile-tooltip';
  tooltip.setAttribute('role', 'status');
  tooltip.replaceChildren(strong(title), span(message));
  document.body.appendChild(tooltip);

  const rect = anchorElement.getBoundingClientRect();
  const tooltipX = Math.min(
    Math.max(12, rect.left + rect.width / 2 - tooltip.offsetWidth / 2),
    window.innerWidth - tooltip.offsetWidth - 12
  );
  const tooltipY = Math.max(
    12,
    rect.top + window.scrollY - tooltip.offsetHeight - 12
  );

  tooltip.style.left = `${tooltipX}px`;
  tooltip.style.top = `${tooltipY}px`;

  requestAnimationFrame(() => {
    tooltip.classList.add('tooltip-visible');
  });

  window.setTimeout(() => {
    tooltip.classList.remove('tooltip-visible');
    window.setTimeout(() => tooltip.remove(), 250);
  }, 2200);
}

function strong(text) {
  const element = document.createElement('strong');
  element.textContent = text;
  return element;
}

function span(text) {
  const element = document.createElement('span');
  element.textContent = text;
  return element;
}
