/*
 *  Emoji Minesweeper
 *  Copyright (c) Michael Kolesidis <michael.kolesidis@gmail.com>
 *  GNU Affero General Public License v3.0
 */

import { preloadImage } from './assetPreloader.js';

const desktopLogo = {
  light: 'assets/thumbfeed-logo-inline.svg',
  dark: 'assets/thumbfeed-logo-inline-white.svg',
};

const icblLogo = {
  light: 'assets/icbl_logo.svg',
  dark: 'assets/icbl_logo_white.svg',
};

const logoCache = new Map();
const logoSources = [
  desktopLogo.light,
  desktopLogo.dark,
  'assets/thumbfeed-logo.svg',
  icblLogo.light,
  icblLogo.dark,
];

export function setLogoTheme(isDarkMode) {
  primeLogoCache('desktop-logo', desktopLogo, 'Thumbfeed logo');
  primeLogoCache(
    'icbl-logo',
    icblLogo,
    'International Campaign to Ban Landmines logo'
  );

  replaceImage(
    'desktop-logo',
    isDarkMode ? desktopLogo.dark : desktopLogo.light,
    'Thumbfeed logo'
  );
  replaceImage(
    'icbl-logo',
    isDarkMode ? icblLogo.dark : icblLogo.light,
    'International Campaign to Ban Landmines logo'
  );
}

export function setDesktopLogoTheme(isDarkMode) {
  setLogoTheme(isDarkMode);
}

export function preloadLogoAssets() {
  logoSources.forEach(preloadLogoSource);
  primeLogoCache('desktop-logo', desktopLogo, 'Thumbfeed logo');
  primeLogoCache(
    'icbl-logo',
    icblLogo,
    'International Campaign to Ban Landmines logo'
  );
}

function preloadLogoSource(source) {
  preloadImage(source);
}

function primeLogoCache(id, sources, alt) {
  const currentLogo = document.getElementById(id);

  if (!currentLogo) {
    return;
  }

  Object.values(sources).forEach(source => {
    getCachedLogo(id, source, alt, currentLogo);
  });
}

function replaceImage(id, source, alt) {
  const currentLogo = document.getElementById(id);

  if (!currentLogo || currentLogo.getAttribute('src') === source) {
    return;
  }

  const nextLogo = getCachedLogo(id, source, alt, currentLogo);
  currentLogo.replaceWith(nextLogo);
}

function getCachedLogo(id, source, alt, currentLogo) {
  const cacheKey = `${id}:${source}`;

  if (!logoCache.has(cacheKey)) {
    const logo = document.createElement('img');
    logo.id = id;
    logo.className = currentLogo.className;
    logo.alt = currentLogo.alt || alt;
    logo.src = source;

    if (currentLogo.style.cssText) {
      logo.style.cssText = currentLogo.style.cssText;
    }

    logoCache.set(cacheKey, logo);
  }

  return logoCache.get(cacheKey);
}
