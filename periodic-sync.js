document.addEventListener('DOMContentLoaded', function() {
    navigator.serviceWorker.ready.then(function(registration) {
      return registration.periodicSync.register('periodic-sync', {
        minInterval: 24 * 60 * 60 * 1000, // 1 day
      });
    });
  });
  