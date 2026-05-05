/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

const desktopLogo = {
  light: 'assets/thumbfeed-logo-inline.svg',
  dark: 'assets/thumbfeed-logo-inline-white.svg',
};

export function setDesktopLogoTheme(isDarkMode) {
  const logo = document.getElementById('desktop-logo');

  if (!logo) {
    return;
  }

  logo.src = isDarkMode ? desktopLogo.dark : desktopLogo.light;
}
