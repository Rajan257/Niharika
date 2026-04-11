const CACHE_NAME = 'niharika-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/api.js',
  '/assets/rajan-rai.png',
  '/assets/kabir.png',
  '/assets/bachchan.png',
  '/assets/mirabai.png',
  '/assets/dinkar.png',
  '/assets/gulzar.png',
  '/assets/mahadevi.png',
  '/assets/pant.png',
  '/assets/rahim.png',
  '/assets/nirala.png',
  '/assets/prasad.png',
  '/assets/panwar.png',
  'https://cdn-icons-png.flaticon.com/512/3261/3261310.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
