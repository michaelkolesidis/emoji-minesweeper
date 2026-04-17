/*
 * Emoji Minesweeper
 * Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 * GNU Affero General Public License v3.0
 */

export default function CustomButton() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  const showMobileTooltip = anchorElement => {
    if (document.querySelector('.mobile-tooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'mobile-tooltip';
    tooltip.innerText = 'Please visit on desktop';
    document.body.appendChild(tooltip);

    const rect = anchorElement.getBoundingClientRect();
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

  // Button Creation
  const customButton = document.createElement('div');
  customButton.title = `Custom level`;
  customButton.className = `emoji-button`;
  customButton.innerHTML = `<img src="emoji/keycap_asterisk_flat.png" />`;

  if (typeof level !== 'undefined' && level === 'custom') {
    customButton.classList.add('emoji-button-clicked');
  }

  //  Click Functionality
  customButton.addEventListener(
    'click',
    e => {
      if (isMobile) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        showMobileTooltip(customButton);
        return false;
      }

      if (typeof level !== 'undefined' && level !== 'custom') {
        window.localStorage.setItem('level', 'custom');
        window.location.reload();
      }
    },
    true
  );

  // Keyboard Action Handling
  document.addEventListener('keydown', e => {
    // Ignore keyboard shortcuts on mobile devices
    if (isMobile) return;

    const customModalOpen = window.localStorage.getItem('customModalOpen');
    if (
      e.code === 'Digit4' &&
      typeof level !== 'undefined' &&
      level !== 'custom' &&
      customModalOpen !== 'true'
    ) {
      window.localStorage.setItem('level', 'custom');
      window.location.reload();
    }
  });

  return customButton;
}
