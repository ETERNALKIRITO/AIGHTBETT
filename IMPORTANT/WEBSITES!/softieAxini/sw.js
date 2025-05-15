// sw.js
const CACHE_NAME = 'softieaxin-audio-cache-v7'; // <<<< IMPORTANT: Update version
const APP_SHELL_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
];

const EXTERNAL_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap',
    'https://ik.imagekit.io/9llyyueko/STATIC%20IMAGES/icon256.png?updatedAt=1745897134054'
];

const ALL_AUDIO_URLS = [
    // Audios
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-stained-brutal-calamity.mp3?updatedAt=1747151322673",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-scourge-of-the-universe.mp3?updatedAt=1747151326458",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/hokma-battle-1.mp3?updatedAt=1747151329996",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-roblox-retro.mp3?updatedAt=1747151335053",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-open-frenzy.mp3?updatedAt=1747151339790",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-bloody-coagulant.mp3?updatedAt=1747151343203",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-domyeah-final-boss.mp3?updatedAt=1747151346799",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-unholy-insurgency.mp3?updatedAt=1747151351583",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-an-enigmatic-encounter-fdy-remastered.mp3?updatedAt=1747151523125",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-threats-of-the-ocean-floor.mp3?updatedAt=1747151527037",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-universal-collapse.mp3?updatedAt=1747151531381",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/vani-blood-cleric.mp3?updatedAt=1747151535394",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/peacesong.mp3?updatedAt=1747151539066",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/snail-house-hot-milk.mp3?updatedAt=1747151542443",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-last-breath-sans.mp3?updatedAt=1747151546548",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/reality-perception.mp3?updatedAt=1747151554023",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-time-paradox-sans.mp3?updatedAt=1747151558008",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-candyland.mp3?updatedAt=1747151561469",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/rage-no-2-reaper.mp3?updatedAt=1747151725614",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/joyful-chess-super-slowed.mp3?updatedAt=1747234121592",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/killstreak-500.mp3?updatedAt=1747151573823",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/npc.mp3?updatedAt=1747151569925",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/sunday-in-bed.mp3?updatedAt=1747151577328",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-crab-rave.mp3?updatedAt=1747151581197",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/dr-livsey-phonk.mp3?updatedAt=1747151585081",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/lovely-bastard.mp3?updatedAt=1747151588672",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/dezire-burnout.mp3?updatedAt=1747151591982",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/blue-horizion-ultra-slowed.mp3?updatedAt=1747151596123",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/vyrval%20-%20%E2%9C%BBH+(second%20drop%20+%20super%20slowed).mp3?updatedAt=1747157020792",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/passo-bem-sloto.mp3?updatedAt=1747151614296",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-undertale-OST-080.mp3?updatedAt=1747151610974",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-glitchtale-ost-true-love.mp3?updatedAt=1747151607594",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/jpn-amend.mp3?updatedAt=1747151603012",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/cute-depressed.mp3?updatedAt=1747151618812",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/blue-horizion-slowed.mp3?updatedAt=1747151633639",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/montagem.mp3?updatedAt=1747151630278",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/nursery-phonk.mp3?updatedAt=1747151626695",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/nowyouwontletgo.mp3?updatedAt=1747151623356",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-doors-elevator-music.mp3?updatedAt=1747151637755",
    "https://ik.imagekit.io/ut3w2pq43i/AUDIO/joyful-chess-slowed.mp3?updatedAt=1747234161752",
    // Songs
    "https://ik.imagekit.io/ut3w2pq43i/SONG/skyfall.mp3?updatedAt=1747151760064",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-touch-tone-telephone.mp3?updatedAt=1747151764966",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/2-phut-hon.mp3?updatedAt=1747151768758", // Checked for .io.com typo, this one is correct.
    "https://ik.imagekit.io/ut3w2pq43i/SONG/gangam-style.mp3?updatedAt=1747151772839",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/dekho-na-dekho.mp3?updatedAt=1747151777337",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/my-ordinary-life.mp3?updatedAt=1747151781723",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/bloody-marry.mp3?updatedAt=1747151785310",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/nsync-bye-bye-bye.mp3?updatedAt=1747151789443",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/dusk-till-dawn.mp3?updatedAt=1747151793833",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/darkside.mp3?updatedAt=1747151797794",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/cradles.mp3?updatedAt=1747151801266",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/golden-hour.mp3?updatedAt=1747151805035",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/house-of-memories.mp3?updatedAt=1747151809195",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/on-and-on-and-on.mp3?updatedAt=1747151812995",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/believer.mp3?updatedAt=1747151816634",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/lovely.mp3?updatedAt=1747151820190",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-gas-gas-gas.mp3?updatedAt=1747151823643",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/wait-a-minute.mp3?updatedAt=1747151827298",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/dancin.mp3?updatedAt=1747151835226",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-its-going-down-now.mp3?updatedAt=1747151840027",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/bad-boy.mp3?updatedAt=1747151844989",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-middle-of-the-night.mp3?updatedAt=1747151848617",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-fairytale.mp3?updatedAt=1747151852082",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/cupid.mp3?updatedAt=1747151855929",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/woman.mp3?updatedAt=1747151859656",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/enemy.mp3?updatedAt=1747151863574",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/all-my-friends-are-so-toxic.mp3?updatedAt=1747151867544",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/worth-nothing.mp3?updatedAt=1747151871062",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/montero.mp3?updatedAt=1747151874330",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/honey-pie.mp3?updatedAt=1747151878061",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/wildeside-anime.mp3?updatedAt=1747151881452",
    "https://ik.imagekit.io/ut3w2pq43i/SONG/apt-apt.mp3?updatedAt=1747234063283"
];

const ALL_FILES_TO_PRECACHE = [
    ...APP_SHELL_FILES,
    ...EXTERNAL_ASSETS,
    ...ALL_AUDIO_URLS
];

self.addEventListener('install', (event) => {
    console.log(`SW: INSTALL event started for version: ${CACHE_NAME}`);
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                console.log(`SW: Cache ${CACHE_NAME} opened. Attempting to pre-cache ${ALL_FILES_TO_PRECACHE.length} files.`);
                let successfullyCachedCount = 0;
                let failedCachedCount = 0;
                const failedUrls = [];

                for (let i = 0; i < ALL_FILES_TO_PRECACHE.length; i++) {
                    const urlToCache = ALL_FILES_TO_PRECACHE[i];
                    // console.log(`SW: INSTALL - Attempting to fetch & cache (${i+1}/${ALL_FILES_TO_PRECACHE.length}): ${urlToCache}`);
                    try {
                        // Explicitly fetch with 'cors' mode for cross-origin resources
                        const request = new Request(urlToCache, { mode: 'cors' });
                        const response = await fetch(request);

                        // Check if the response is OK and not opaque.
                        // Opaque responses (response.type === 'opaque') have status 0 and response.ok is false.
                        // We need a real, usable response for audio.
                        // Allow HTTP 200 (OK) and 206 (Partial Content for ranged requests, common with audio/video)
                        if (response.ok && (response.status === 200 || response.status === 206) && response.type !== 'opaque') {
                            await cache.put(request, response.clone()); // Use response.clone() as response body can be consumed only once
                            console.log(`SW: INSTALL - Successfully fetched and cached: ${urlToCache} (Status: ${response.status}, Type: ${response.type})`);
                            successfullyCachedCount++;
                        } else {
                            console.error(`SW: INSTALL - FAILED to cache (bad response): ${urlToCache}`, `Status: ${response.status}`, `Type: ${response.type}`, `OK: ${response.ok}`);
                            failedCachedCount++;
                            failedUrls.push({ url: urlToCache, error: `Bad response - Status ${response.status}, Type ${response.type}, OK ${response.ok}` });
                        }
                    } catch (error) { // Catches network errors (e.g., DNS, server unreachable)
                        console.error(`SW: INSTALL - FAILED to fetch (network error): ${urlToCache}`, `Error: ${error.message}`, `Name: ${error.name}`);
                        failedCachedCount++;
                        failedUrls.push({ url: urlToCache, error: `${error.name}: ${error.message}` });
                    }
                }

                console.log(`SW: INSTALL - Pre-caching attempt finished. Successfully cached: ${successfullyCachedCount}, Failed: ${failedCachedCount}`);
                if (failedCachedCount > 0) {
                    console.warn("SW: INSTALL - Some files failed to pre-cache. List of failures:");
                    failedUrls.forEach(item => console.warn(`  - URL: ${item.url}, Reason: ${item.error}`));
                }
                
                console.log("SW: INSTALL - Calling self.skipWaiting()");
                await self.skipWaiting();
                console.log("SW: INSTALL - self.skipWaiting() finished.");

            } catch (error) {
                console.error(`SW: INSTALL - CRITICAL Error opening cache or during main installation logic:`, error);
            }
        })()
    );
});

self.addEventListener('activate', (event) => {
    console.log(`SW: ACTIVATE event started for version: ${CACHE_NAME}`);
    event.waitUntil(
        (async () => {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(async (cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log(`SW: ACTIVATE - Deleting old cache: ${cacheName}`);
                            await caches.delete(cacheName);
                        }
                    })
                );
                console.log('SW: ACTIVATE - Old caches deleted.');
                console.log('SW: ACTIVATE - Claiming clients.');
                await self.clients.claim();
                console.log('SW: ACTIVATE - Clients claimed. New Service Worker is now in control.');
            } catch (error) {
                console.error(`SW: ACTIVATE - Error during activation:`, error);
            }
        })()
    );
});

// Fetch handler remains the same as sw.js v6
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (event.request.method === 'GET' && url.protocol.startsWith('http')) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    // console.log('SW: FETCH - Serving from cache:', event.request.url);
                    return cachedResponse;
                }
                // console.log('SW: FETCH - Not in cache. Fetching from network:', event.request.url);
                return fetch(event.request).then((networkResponse) => {
                    // For on-demand caching, we are a bit more lenient, 
                    // as the browser might make range requests which are fine.
                    if (networkResponse && (networkResponse.ok || networkResponse.status === 206)) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache)
                                .then(() => { /* console.log('SW: FETCH - Cached on demand:', event.request.url); */ })
                                .catch(err => console.error('SW: FETCH - Failed to cache on demand:', event.request.url, err));
                        });
                    } else if (networkResponse) {
                        // console.warn('SW: FETCH - Network response not OK (will not cache):', event.request.url, networkResponse.status, networkResponse.statusText);
                    }
                    return networkResponse;
                }).catch(error => {
                    console.error(`SW: FETCH - Network fetch failed for: ${event.request.url}`, `Error: ${error.message}`, `Name: ${error.name}`);
                    return new Response(
                        `SERVICE WORKER: Network error and not in cache for ${event.request.url}. You might be offline.`,
                        { status: 404, statusText: "Network Error or Not Found in Cache", headers: { 'Content-Type': 'text/plain'} }
                    );
                });
            })
        );
    } else {
        // For non-GET requests or unhandled protocols, pass through to the network.
        event.respondWith(fetch(event.request));
    }
});