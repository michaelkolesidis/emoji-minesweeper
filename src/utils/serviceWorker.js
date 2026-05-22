import { scheduleAfterInitialRender } from './assetPreloader.js';

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) {
      return;
    }

    refreshing = true;
    window.location.reload();
  });

  scheduleAfterInitialRender('service-worker-registration', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => registration.update())
      .catch(() => {});
  });
}
