const CACHE_VERSION = 'emoji-minesweeper-v2';
const APP_CACHE = `${CACHE_VERSION}-app`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/help.html',
  '/manifest.webmanifest',
  '/fonts/MochiyPopOne-Regular.ttf',
  '/fonts/Nunito-Black.ttf',
  '/sounds/flag.mp3',
  '/sounds/loss.mp3',
  '/sounds/pop.mp3',
  '/sounds/win.mp3',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/assets/apple-touch-icon.png',
  '/assets/favicon.ico',
  '/assets/icbl_logo.svg',
  '/assets/icbl_logo_white.svg',
  '/assets/logo.svg',
  '/assets/logo.png',
  '/assets/thumbfeed-logo.svg',
  '/assets/thumbfeed-logo-inline.svg',
  '/assets/thumbfeed-logo-inline-white.svg',
  '/emoji-minesweeper.png',
  '/emoji-minesweeper.svg',
  '/emoji/abacus_flat.png',
  '/emoji/bear_flat.png',
  '/emoji/black_large_square_flat.png',
  '/emoji/black_square_button_flat.png',
  '/emoji/bomb_flat.png',
  '/emoji/bug_flat.png',
  '/emoji/cherry_blossom_flat.png',
  '/emoji/collision_flat.png',
  '/emoji/confounded_face_flat.png',
  '/emoji/cross_mark_flat.png',
  '/emoji/deciduous_tree_flat.png',
  '/emoji/face_with_spiral_eyes_flat.png',
  '/emoji/goblin_flat.png',
  '/emoji/grinning_face_with_smiling_eyes_flat.png',
  '/emoji/hibiscus_flat.png',
  '/emoji/hourglass_done_flat.png',
  '/emoji/japanese_castle_flat.png',
  '/emoji/keycap_1_flat.png',
  '/emoji/keycap_2_flat.png',
  '/emoji/keycap_3_flat.png',
  '/emoji/keycap_4_flat.png',
  '/emoji/keycap_5_flat.png',
  '/emoji/keycap_6_flat.png',
  '/emoji/keycap_7_flat.png',
  '/emoji/keycap_8_flat.png',
  '/emoji/keycap_9_flat.png',
  '/emoji/keycap_asterisk_flat.png',
  '/emoji/knocked-out_face_flat.png',
  '/emoji/mushroom_flat.png',
  '/emoji/muted_speaker_flat.png',
  '/emoji/partying_face_flat.png',
  '/emoji/paw_prints_flat.png',
  '/emoji/pensive_face_flat.png',
  '/emoji/person_surfing_flat_default.png',
  '/emoji/shark_flat.png',
  '/emoji/smiling_face_with_smiling_eyes_flat.png',
  '/emoji/smiling_face_with_sunglasses_flat.png',
  '/emoji/speaker_flat.png',
  '/emoji/squid_flat.png',
  '/emoji/sun_flat.png',
  '/emoji/triangular_flag_flat.png',
  '/emoji/unicorn_flat.png',
  '/emoji/waning_crescent_moon_flat.png',
  '/emoji/water_wave_flat.png',
  '/emoji/white_large_square_flat.png',
  '/emoji/white_question_mark_flat.png',
  '/emoji/white_square_button_flat.png',
  '/emoji/wood_flat.png',
  '/emoji/svg/bar_chart_flat.svg',
  '/emoji/svg/left-right_arrow_flat.svg',
  '/emoji/svg/new_button_flat.svg',
  '/emoji/svg/up-down_arrow_flat.svg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then(cache => cache.addAll(CORE_ASSETS).then(() => cache))
      .then(cache => cacheGeneratedAssets(cache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => ![APP_CACHE, RUNTIME_CACHE].includes(key))
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, '/index.html'));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);

  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }

  return response;
}

async function cacheGeneratedAssets(cache) {
  const htmlPaths = ['/index.html', '/help.html'];
  const assets = new Set();

  await Promise.all(
    htmlPaths.map(async path => {
      const response = await fetch(path);

      if (!response.ok) {
        return;
      }

      cache.put(path, response.clone());
      const html = await response.text();

      for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
        const asset = new URL(match[1], self.location.origin);

        if (asset.origin === self.location.origin) {
          assets.add(asset.pathname);
        }
      }
    })
  );

  await Promise.all(
    [...assets].map(async asset => {
      try {
        const response = await fetch(asset);

        if (response.ok) {
          await cache.put(asset, response);
        }
      } catch {
        // Optional generated assets can be skipped.
      }
    })
  );
}

async function networkFirst(request, fallbackPath) {
  try {
    const response = await fetch(request);

    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    return (
      (await caches.match(request)) ||
      (await caches.match(fallbackPath)) ||
      Response.error()
    );
  }
}
