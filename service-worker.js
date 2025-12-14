// نام cache
const CACHE_NAME = 'german-grammar-app-v1';

// فایل‌هایی که باید cache شوند
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-512.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap'
];

// نصب Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('فایل‌ها در cache ذخیره شدند');
        return cache.addAll(urlsToCache);
      })
  );
});

// فعال‌سازی Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('حذف cache قدیمی:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// درخواست‌های شبکه
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // اگر فایل در cache بود، از cache برگردان
        if (response) {
          return response;
        }
        
        // در غیر این صورت از شبکه بگیر
        return fetch(event.request)
          .then(response => {
            // فقط پاسخ‌های معتبر را cache کن
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // کلون کردن پاسخ
            const responseToCache = response.clone();
            
            // ذخیره در cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // اگر خطا در دریافت از شبکه، صفحه اصلی را برگردان
            return caches.match('./index.html');
          });
      })
  );
});