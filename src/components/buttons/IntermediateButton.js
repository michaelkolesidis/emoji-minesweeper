/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

export default function IntermediateButton() {
  // Mobile Check
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  // Button Creation
  const intermediateButton = document.createElement('div');
  intermediateButton.title = `Intermediate level`;
  intermediateButton.className = `emoji-button`;
  intermediateButton.innerHTML = `<img src="emoji/keycap_2_flat.png" />`;

  if (typeof level !== 'undefined' && level === 'intermediate') {
    intermediateButton.classList.add('emoji-button-clicked');
  }

  const showMobileTooltip = anchorElement => {
    if (document.querySelector('.mobile-tooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'mobile-tooltip';
    tooltip.innerText = 'Please visit on desktop';
    document.body.appendChild(tooltip);

    // Get button position
    const rect = anchorElement.getBoundingClientRect();

    // Calculate position
    const tooltipX = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
    const tooltipY = rect.top + window.scrollY - tooltip.offsetHeight - 10;

    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    requestAnimationFrame(() => {
      tooltip.classList.add('tooltip-visible');
    });
    setTimeout(() => {
      tooltip.classList.remove('tooltip-visible');
      setTimeout(() => tooltip.remove(), 100);
    }, 1000);
  };

  // Click Event
  intermediateButton.addEventListener('click', e => {
    if (isMobile) {
      showMobileTooltip(intermediateButton);
      return; // Stop here
    }

    if (typeof level !== 'undefined' && level !== 'intermediate') {
      window.localStorage.setItem('level', 'intermediate');
      window.location.reload();
    }
  });

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    if (isMobile) return;

    const customModalOpen = window.localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit2' &&
      typeof level !== 'undefined' &&
      level !== 'intermediate' &&
      customModalOpen !== 'true'
    ) {
      window.localStorage.setItem('level', 'intermediate');
      window.location.reload();
    }
  });

  return intermediateButton;
}
