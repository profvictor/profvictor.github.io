// On install - caching the application shell
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sw-cache').then(function(cache) {
      // cache any static files that make up the application shell
      return cache.add('index.html');
    })
  );
});

// On network request
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      //If response found return it, else fetch again
      return response || fetch(event.request);
    })
  );
});

// Use background sync for a rich offline experience
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Perform synchronization logic here, e.g. update cached data
      caches.open('sw-cache').then(function(cache) {
        return cache.addAll([
          'data.json',
          'images/image1.jpg',
          'images/image2.jpg'
        ]);
      })
    );
  }
});

// On periodic sync
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'periodic-sync') {
    event.waitUntil(
      // Perform synchronization logic here, e.g. update cached data
      caches.open('sw-cache').then(function(cache) {
        return cache.addAll([
          'data.json',
          'images/image1.jpg',
          'images/image2.jpg'
        ]);
      })
    );
  }
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    self.registration.showNotification('Install successful', {
      body: 'The service worker has been installed.',
      icon: 'path/to/icon.png'
    })
  );
});
