/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

const desktopLogo = {
  light: 'assets/thumbfeed-logo-inline.svg',
  dark: 'assets/thumbfeed-logo-inline-white.svg',
};

const icblLogo = {
  light: 'assets/icbl_logo.svg',
  dark: 'assets/icbl_logo_white.svg',
};

export function setLogoTheme(isDarkMode) {
  setImageSource(
    'desktop-logo',
    isDarkMode ? desktopLogo.dark : desktopLogo.light
  );
  setImageSource('icbl-logo', isDarkMode ? icblLogo.dark : icblLogo.light);
}

export function setDesktopLogoTheme(isDarkMode) {
  setLogoTheme(isDarkMode);
}

function setImageSource(id, source) {
  const logo = document.getElementById(id);

  if (!logo) {
    return;
  }

  logo.src = source;
}
