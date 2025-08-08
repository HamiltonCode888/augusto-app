const CACHE_NAME = 'augusto-pwa-v1';
const ASSETS = ['/', '/index.html','/styles.css','/app.js','/config.js','/assets/icon-192.png','/assets/icon-512.png','/manifest.json'];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate', e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim();});
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});