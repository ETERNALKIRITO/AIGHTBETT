// sw.js
const CACHE_NAME = 'softieaxin-audio-cache-v2'; // Change version if you update the SW logic/app shell files
const APP_SHELL_FILES = [
    '/', // Represents index.html at the root
    '/index.html', // Explicitly add if preferred or if '/' doesn't always resolve
    '/style.css',
    '/script.js',
    // Other essential static assets like a logo/favicon can be listed here too for pre-caching,
    // but many will be caught by the general GET request caching below.
    // Example: '/images/logo.png'
];

// Host and path prefixes for your audio files
const AUDIO_HOST = 'ik.imagekit.io';
const AUDIO_PATH_PREFIX_1 = '/ut3w2pq43i/AUDIO/';
const AUDIO_PATH_PREFIX_2 = '/ut3w2pq43i/SONG/';

self.addEventListener('install', (event) => {
    console.log('SW: Installing version:', CACHE_NAME);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Caching app shell files');
            // Add base URL for external resources if they must be precached
            // For example, the favicon and Google Fonts CSS are fetched from external URLs.
            // It's often better to let them be cached by the 'fetch' event handler on first load.
            const filesToCache = [
                ...APP_SHELL_FILES,
                'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap',
                'https://ik.imagekit.io/9llyyueko/STATIC%20IMAGES/icon256.png?updatedAt=1745897134054'
            ];
            return cache.addAll(filesToCache).catch(err => {
                console.error('SW: Failed to cache some app shell files during install:', err);
                // Allow install to succeed even if some non-critical external assets fail (e.g., font temporarily unavailable)
            });
        }).then(() => self.skipWaiting()) // Activate new SW immediately
    );
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activating version:', CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('SW: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim()) // Take control of uncontrolled clients
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // --- Strategy for Audio Files ---
    // Cache-first, then network. Cache the response if fetched from network.
    if (url.hostname === AUDIO_HOST && (url.pathname.startsWith(AUDIO_PATH_PREFIX_1) || url.pathname.startsWith(AUDIO_PATH_PREFIX_2))) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('SW: Serving audio from cache:', event.request.url);
                    return cachedResponse;
                }
                console.log('SW: Fetching audio from network and caching:', event.request.url);
                return fetch(event.request).then((networkResponse) => {
                    // Check if the response is valid (status 200 for full, 206 for partial content)
                    if (networkResponse && (networkResponse.ok || networkResponse.status === 206)) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                            console.log('SW: Cached audio:', event.request.url);
                        });
                    } else if (networkResponse) {
                        console.warn('SW: Network response for audio not OK:', event.request.url, networkResponse.status, networkResponse.statusText);
                    }
                    return networkResponse;
                }).catch(error => {
                    console.error('SW: Fetching audio failed:', event.request.url, error);
                    // If offline and not in cache, this error will propagate to the audio element.
                    throw error;
                });
            })
        );
    }
    // --- Strategy for other GET requests (App Shell, CSS, JS, Fonts, Images from your domain or CDNs) ---
    // Cache-first, then network. Cache the response if fetched from network.
    // This covers files pre-cached during install and other static assets fetched during runtime.
    else if (event.request.method === 'GET' && url.protocol.startsWith('http')) { // Only cache http/https GET requests
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    // console.log('SW: Serving static asset from cache:', event.request.url);
                    return cachedResponse;
                }
                // console.log('SW: Fetching static asset from network and caching:', event.request.url);
                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.ok) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                            // console.log('SW: Cached static asset:', event.request.url);
                        });
                    } else if (networkResponse && (url.hostname === 'fonts.gstatic.com' || url.hostname === 'fonts.googleapis.com')) {
                        // Don't log warnings for font CDNs if they sometimes fail transiently, but still return the response.
                    }
                     else if (networkResponse) {
                        // console.warn('SW: Network response for static asset not OK:', event.request.url, networkResponse.status, networkResponse.statusText);
                    }
                    return networkResponse;
                }).catch(error => {
                    console.warn('SW: Fetching static asset failed:', event.request.url, error);
                    // For critical app shell files not found in cache and failing network, app might break.
                    // You could return a generic offline page/resource here if needed.
                    // For now, let the error propagate.
                });
            })
        );
    }
    // --- For non-GET requests or unhandled protocols ---
    // Pass through to the network.
    else {
        // console.log('SW: Passing through non-GET/unhandled request to network:', event.request.url);
        event.respondWith(fetch(event.request));
    }
});