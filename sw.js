/* 玄玖知识库 Service Worker —— 离线缓存（PWA）
   策略与官网一致：Cache First + 后台静默更新 + 旧缓存清理 */
const CACHE = 'xuanjiu-kb-v3';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/kbase.css',
  './assets/js/app.js',
  './assets/js/app.min.js',
  './assets/js/anime.js',
  './assets/js/firework.js',
  './assets/js/trail.js',
  './assets/js/bg.js',
  './assets/js/knowledge-data.js',
  './assets/img/favicon.svg',
  './assets/img/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) {
        // 命中：立即返回，后台静默更新缓存（与官网 SW 策略一致）
        fetch(e.request).then(function (res) {
          if (res && res.status === 200 && res.type === 'basic') {
            caches.open(CACHE).then(function (c) { c.put(e.request, res.clone()); });
          }
        }).catch(function () {});
        return hit;
      }
      // 未命中：走网络并存缓存；HTML 失败时降级到首页
      return fetch(e.request).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        if (!res || res.status !== 200) {
          var accept = (e.request.headers.get('Accept') || '');
          if (accept.indexOf('text/html') !== -1) {
            return caches.match('./index.html');
          }
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
