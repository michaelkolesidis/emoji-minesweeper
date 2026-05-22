const imageCache = new Map();
const scheduledJobs = new Set();

export function preloadImage(src, alt = '') {
  if (!imageCache.has(src)) {
    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    imageCache.set(src, image);
  }

  return imageCache.get(src);
}

export function clonePreloadedImage(src, alt = '') {
  const image = preloadImage(src, alt).cloneNode(false);
  image.alt = alt;
  return image;
}

export function preloadImages(sources) {
  sources.forEach(source => {
    if (typeof source === 'string') {
      preloadImage(source);
      return;
    }

    preloadImage(source.src, source.alt ?? '');
  });
}

export function preloadFont(font) {
  if (!document.fonts) {
    return;
  }

  document.fonts.load(font).catch(() => {});
}

export function scheduleAfterInitialRender(key, callback) {
  if (scheduledJobs.has(key)) {
    return;
  }

  scheduledJobs.add(key);

  window.requestAnimationFrame(() => {
    const run = () => callback();

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: 1000 });
      return;
    }

    window.setTimeout(run, 0);
  });
}
