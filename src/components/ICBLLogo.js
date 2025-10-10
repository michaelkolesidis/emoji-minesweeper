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
  icblLogo.src = '../assets/icbl_logo.svg';
  icblLogo.id = 'icbl-logo';

  // Link Wrapper
  const icblLink = document.createElement('a');
  icblLink.href = 'https://www.icblcmc.org/';
  icblLink.target = '_blank';
  icblLink.appendChild(icblLogo);

  // Close Button
//   const closeBtn = document.createElement('button');
//   closeBtn.innerHTML = '×';
//   closeBtn.style.position = 'absolute';
//   closeBtn.style.top = '-8px';
//   closeBtn.style.right = '-8px';
//   closeBtn.style.width = '30px';
//   closeBtn.style.height = '30px';
//   closeBtn.style.border = 'none';
//   closeBtn.style.borderRadius = '50%';
//   closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
//   closeBtn.style.color = 'white';
//   closeBtn.style.cursor = 'pointer';
//   closeBtn.style.display = 'none';
//   closeBtn.style.fontSize = '25px';
//   closeBtn.style.lineHeight = '18px';
//   closeBtn.style.padding = '0';

  // Hover effects
//   icblContainer.addEventListener('mouseenter', () => {
//     closeBtn.style.display = 'block';
//   });
//   icblContainer.addEventListener('mouseleave', () => {
//     closeBtn.style.display = 'none';
//   });

  // Close functionality
//   closeBtn.addEventListener('click', () => {
//     icblContainer.remove();
//   });

  // Assemble
  icblContainer.appendChild(icblLink);
//   icblContainer.appendChild(closeBtn);

  return icblContainer;
}
