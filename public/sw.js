const CACHE_VERSION = 'emoji-minesweeper-v7';
const APP_CACHE = `${CACHE_VERSION}-app`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const BASE_PATH = new URL(self.registration.scope).pathname.replace(/\/$/, '');
const APP_SHELL = withBase('/index.html');

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/help.html',
  '/404.html',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/assets/apple-touch-icon.png',
  '/assets/attention-free-software.png',
  '/assets/favicon.ico',
  '/assets/icbl_logo.svg',
  '/assets/icbl_logo_white.svg',
  '/assets/logo.png',
  '/assets/logo.svg',
  '/assets/logo_wordmark.png',
  '/assets/logo_wordmark.svg',
  '/assets/logo_wordmark_light.png',
  '/assets/logo_wordmark_light.svg',
  '/assets/logo_wordmark_small.png',
  '/assets/only-on-outline-400px.png',
  '/assets/other/cover.png',
  '/assets/other/cover.svg',
  '/assets/pocket_bell_emoji.png',
  '/assets/thumbfeed-logo-inline-white.svg',
  '/assets/thumbfeed-logo-inline.svg',
  '/assets/thumbfeed-logo.svg',
  '/emoji-minesweeper.png',
  '/emoji-minesweeper.svg',
  '/emoji/LICENSE',
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
  '/emoji/empty.png',
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
  '/emoji/svg/abacus_flat.svg',
  '/emoji/svg/bar_chart_flat.svg',
  '/emoji/svg/bear_flat.svg',
  '/emoji/svg/black_large_square_flat.svg',
  '/emoji/svg/black_square_button_flat.svg',
  '/emoji/svg/bomb_flat.svg',
  '/emoji/svg/bug_flat.svg',
  '/emoji/svg/cherry_blossom_flat.svg',
  '/emoji/svg/collision_flat.svg',
  '/emoji/svg/confounded_face_flat.svg',
  '/emoji/svg/cross_mark_flat.svg',
  '/emoji/svg/deciduous_tree_flat.svg',
  '/emoji/svg/face_with_spiral_eyes_flat.svg',
  '/emoji/svg/goblin_flat.svg',
  '/emoji/svg/grinning_cat_with_smiling_eyes_flat.svg',
  '/emoji/svg/grinning_face_with_smiling_eyes_flat.svg',
  '/emoji/svg/hibiscus_flat.svg',
  '/emoji/svg/hourglass_done_flat.svg',
  '/emoji/svg/japanese_castle_flat.svg',
  '/emoji/svg/keycap_1_flat.svg',
  '/emoji/svg/keycap_2_flat.svg',
  '/emoji/svg/keycap_3_flat.svg',
  '/emoji/svg/keycap_4_flat.svg',
  '/emoji/svg/keycap_5_flat.svg',
  '/emoji/svg/keycap_6_flat.svg',
  '/emoji/svg/keycap_7_flat.svg',
  '/emoji/svg/keycap_8_flat.svg',
  '/emoji/svg/keycap_9_flat.svg',
  '/emoji/svg/knocked-out_face_flat.svg',
  '/emoji/svg/left-right_arrow_flat.svg',
  '/emoji/svg/mushroom_flat.svg',
  '/emoji/svg/muted_speaker_flat.svg',
  '/emoji/svg/new_button_flat.svg',
  '/emoji/svg/partying_face_flat.svg',
  '/emoji/svg/paw_prints_flat.svg',
  '/emoji/svg/pensive_face_flat.svg',
  '/emoji/svg/person_surfing_flat_default.svg',
  '/emoji/svg/shark_flat.svg',
  '/emoji/svg/smiling_face_with_smiling_eyes_flat.svg',
  '/emoji/svg/smiling_face_with_sunglasses_flat.svg',
  '/emoji/svg/speaker_flat.svg',
  '/emoji/svg/squid_flat.svg',
  '/emoji/svg/sun_flat.svg',
  '/emoji/svg/triangular_flag_flat.svg',
  '/emoji/svg/unicorn_flat.svg',
  '/emoji/svg/up-down_arrow_flat.svg',
  '/emoji/svg/waning_crescent_moon_flat.svg',
  '/emoji/svg/water_wave_flat.svg',
  '/emoji/svg/white_large_square_flat.svg',
  '/emoji/svg/white_question_mark_flat.svg',
  '/emoji/svg/white_square_button_flat.svg',
  '/emoji/svg/wood_flat.svg',
  '/emoji/triangular_flag_flat.png',
  '/emoji/unicorn_flat.png',
  '/emoji/waning_crescent_moon_flat.png',
  '/emoji/water_wave_flat.png',
  '/emoji/white_large_square_flat.png',
  '/emoji/white_question_mark_flat.png',
  '/emoji/white_square_button_flat.png',
  '/emoji/wood_flat.png',
  '/fonts/MochiyPopOne-Regular.ttf',
  '/fonts/Nunito-Black.ttf',
  '/fonts/Nunito-Regular.ttf',
  '/manifest.webmanifest',
  '/robots.txt',
  '/sitemap.xml',
  '/sounds/flag.mp3',
  '/sounds/loss.mp3',
  '/sounds/pop.mp3',
  '/sounds/win.mp3',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(APP_CACHE)
      .then(async cache => {
        await cacheAssets(cache, PRECACHE_ASSETS);
        await cacheGeneratedAssets(cache);
      })
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
    event.respondWith(appShellFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});

async function appShellFirst(request) {
  const pathname = new URL(request.url).pathname;
  const cached =
    (await caches.match(request)) ||
    (await caches.match(normalizePath(pathname))) ||
    (await caches.match(APP_SHELL));

  refreshCache(request);

  if (cached) {
    return cached;
  }

  try {
    return await fetchAndCache(request);
  } catch {
    return offlineFallback(request);
  }
}

async function cacheFirst(request) {
  const cached = await matchCached(request);

  if (cached) {
    return cached;
  }

  try {
    return await fetchAndCache(request);
  } catch {
    return offlineFallback(request);
  }
}

async function fetchAndCache(request) {
  const response = await fetch(request);

  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }

  return response;
}

async function refreshCache(request) {
  try {
    await fetchAndCache(request);
  } catch {
    // Offline refreshes keep using the cached app shell.
  }
}

async function matchCached(request) {
  const url = new URL(request.url);
  const candidates = [
    request,
    url.pathname,
    normalizePath(url.pathname),
    stripBase(url.pathname),
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    const cached = await caches.match(candidate);

    if (cached) {
      return cached;
    }
  }

  return null;
}

async function offlineFallback(request) {
  if (request.destination === 'document' || request.mode === 'navigate') {
    return (
      (await caches.match(APP_SHELL)) ||
      (await caches.match(withBase('/index.html'))) ||
      Response.error()
    );
  }

  if (request.destination === 'image') {
    return transparentImage();
  }

  if (request.destination === 'audio') {
    return new Response(new ArrayBuffer(0), {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  }

  return Response.error();
}

function transparentImage() {
  const bytes = Uint8Array.from(
    atob('R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='),
    character => character.charCodeAt(0)
  );

  return new Response(bytes, {
    headers: { 'Content-Type': 'image/gif' },
  });
}

async function cacheAssets(cache, assets) {
  await Promise.all(
    [...new Set(assets)].map(async asset => {
      try {
        const cacheUrl = withBase(asset);
        const response = await fetch(cacheUrl, { cache: 'reload' });

        if (response.ok) {
          await cache.put(cacheUrl, response);
        }
      } catch {
        // One missing optional file must not break offline installation.
      }
    })
  );
}

async function cacheGeneratedAssets(cache) {
  const htmlPaths = [withBase('/index.html'), withBase('/help.html')];
  const assets = new Set();

  await Promise.all(
    htmlPaths.map(async path => {
      try {
        const response = await fetch(path, { cache: 'reload' });

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
      } catch {
        // The existing app shell cache is still usable offline.
      }
    })
  );

  await cacheAssets(cache, [...assets]);
}

function normalizePath(pathname) {
  const helpPath = withBase('/help');

  if (pathname === helpPath) {
    return withBase('/help.html');
  }

  return pathname;
}

function stripBase(pathname) {
  if (!BASE_PATH || !pathname.startsWith(BASE_PATH + '/')) {
    return pathname;
  }

  return pathname.slice(BASE_PATH.length);
}

function withBase(pathname) {
  if (pathname.startsWith(BASE_PATH + '/')) {
    return pathname;
  }

  if (pathname === '/') {
    return `${BASE_PATH}/` || '/';
  }

  return `${BASE_PATH}${pathname}`;
}
