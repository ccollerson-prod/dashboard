const CACHE_NAME = "dashboard-v2";

self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  var url = event.request.url;
  if (url.indexOf("events.json") !== -1 || url.indexOf("photos.json") !== -1 || url.indexOf("version.txt") !== -1 || url.indexOf("http") === 0 && url.indexOf(self.location.origin) !== 0) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
