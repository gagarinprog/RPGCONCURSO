// === InfraRPG – Service Worker (PWA) ===
const CACHE_NAME = 'infra-rpg-v2';

const PRECACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/constants.js',
  '/js/ui.js',
  '/js/game.js',
  '/data/database.js',
  '/assets/icon.svg',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;600&display=swap'
];

// Instalação: pré-cacheamento dos recursos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Ativação: remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: estratégia Cache-First para assets, Network-First para API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Supabase: sempre via rede (não cachear dados dinâmicos)
  if (url.hostname.endsWith('.supabase.co')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // Assets estáticos: Cache-First
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
