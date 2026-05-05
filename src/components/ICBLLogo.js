/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis
 *  GNU Affero General Public License v3.0
 */

export default function ICBLLogo() {
  // Container
  const icblContainer = document.createElement('div');
  icblContainer.style.position = 'relative';
  icblContainer.style.display = 'inline-block';
  icblContainer.style.marginTop = '20px';
  icblContainer.style.paddingRight = '30px';
  icblContainer.style.paddingLeft = '30px';

  // Logo Image
  const icblLogo = document.createElement('img');
  icblLogo.style.width = '180px';
  icblLogo.src = 'assets/icbl_logo.svg';
  icblLogo.id = 'icbl-logo';

  // Link Wrapper
  const icblLink = document.createElement('a');
  icblLink.href = 'https://www.icblcmc.org/';
  icblLink.target = '_blank';
  icblLink.appendChild(icblLogo);

  // Assemble
  icblContainer.appendChild(icblLink);

  return icblContainer;
}
