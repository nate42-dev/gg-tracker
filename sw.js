// Bump VERSION on each deploy; old caches are purged, data (localStorage) is never touched.
const VERSION = "gg-v2";
const SHELL = ["./", "./index.html", "./app.js", "./manifest.webmanifest", "./icon-180.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// Stale-while-revalidate: instant offline loads, silently fetches updates for next open.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(e.request);
      const network = fetch(e.request)
        .then((res) => { if (res && res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => cached);
      return cached || network;
    })
  );
});
