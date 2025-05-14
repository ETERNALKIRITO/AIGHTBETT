document.addEventListener('DOMContentLoaded', () => {
    // --- localStorage Keys ---
    const LS_KEYS = {
        lastTrackUrl: 'softPlayer_lastTrackUrl',
        lastTrackTitle: 'softPlayer_lastTrackTitle',
        lastPlaybackTime: 'softPlayer_lastPlaybackTime',
        currentTheme: 'softPlayer_currentTheme'
    };

const audioCategories = {
    "Audios": [
        {
            title: "Stained Brutal Calamity",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-stained-brutal-calamity.mp3?updatedAt=1747151322673"
        },
        {
            title: "Scourge Of The Universe",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-scourge-of-the-universe.mp3?updatedAt=1747151326458"
        },
        {
            title: "Hokma Battle 1", // Assuming 'hokma-battle-1'
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/hokma-battle-1.mp3?updatedAt=1747151329996"
        },
        {
            title: "Roblox Retro",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-roblox-retro.mp3?updatedAt=1747151335053"
        },
        {
            title: "Open Frenzy",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-open-frenzy.mp3?updatedAt=1747151339790"
        },
        {
            title: "Bloody Coagulant",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-bloody-coagulant.mp3?updatedAt=1747151343203"
        },
        {
            title: "Domyeah Final Boss",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-domyeah-final-boss.mp3?updatedAt=1747151346799"
        },
        {
            title: "Unholy Insurgency",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-unholy-insurgency.mp3?updatedAt=1747151351583"
        },
        {
            title: "An Enigmatic Encounter (FDY Remastered)",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-an-enigmatic-encounter-fdy-remastered.mp3?updatedAt=1747151523125"
        },
        {
            title: "Threats Of The Ocean Floor",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-threats-of-the-ocean-floor.mp3?updatedAt=1747151527037"
        },
        {
            title: "Universal Collapse",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-universal-collapse.mp3?updatedAt=1747151531381"
        },
        {
            title: "Vani Blood Cleric",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/vani-blood-cleric.mp3?updatedAt=1747151535394"
        },
        {
            title: "Peacesong",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/peacesong.mp3?updatedAt=1747151539066"
        },
        {
            title: "Snail House Hot Milk",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/snail-house-hot-milk.mp3?updatedAt=1747151542443"
        },
        {
            title: "Last Breath Sans",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-last-breath-sans.mp3?updatedAt=1747151546548"
        },
        {
            title: "Reality Perception",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/reality-perception.mp3?updatedAt=1747151554023"
        },
        {
            title: "Time Paradox Sans",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-time-paradox-sans.mp3?updatedAt=1747151558008"
        },
        {
            title: "Candyland",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-candyland.mp3?updatedAt=1747151561469"
        },
        {
            title: "Rage No 2 Reaper",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/rage-no-2-reaper.mp3?updatedAt=1747151725614"
        },
        {
            title: "Joyful Chess (Super Slowed)",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/joyful-chess-super-slowed.mp3?updatedAt=1747234121592"
        },
        {
            title: "Killstreak 500",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/killstreak-500.mp3?updatedAt=1747151573823"
        },
        {
            title: "NPC",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/npc.mp3?updatedAt=1747151569925"
        },
        {
            title: "Sunday In Bed",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/sunday-in-bed.mp3?updatedAt=1747151577328"
        },
        {
            title: "Crab Rave",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-crab-rave.mp3?updatedAt=1747151581197"
        },
        {
            title: "Dr Livesey Phonk",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/dr-livsey-phonk.mp3?updatedAt=1747151585081"
        },
        {
            title: "Lovely Bastard",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/lovely-bastard.mp3?updatedAt=1747151588672"
        },
        {
            title: "Dezire Burnout",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/dezire-burnout.mp3?updatedAt=1747151591982"
        },
        {
            title: "Blue Horizon (Ultra Slowed)",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/blue-horizion-ultra-slowed.mp3?updatedAt=1747151596123"
        },
        {
            title: "Vyrval - ❀H (Second Drop + Super Slowed)", // Special characters might display differently depending on font/encoding
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/vyrval%20-%20%E2%9C%BBH+(second%20drop%20+%20super%20slowed).mp3?updatedAt=1747157020792"
        },
        {
            title: "Passo Bem Sloto", // Assuming "Passo Bem Sloto"
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/passo-bem-sloto.mp3?updatedAt=1747151614296"
        },
        {
            title: "Undertale OST 080",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-undertale-OST-080.mp3?updatedAt=1747151610974"
        },
        {
            title: "Glitchtale OST True Love",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-glitchtale-ost-true-love.mp3?updatedAt=1747151607594"
        },
        {
            title: "JPN Amend",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/jpn-amend.mp3?updatedAt=1747151603012"
        },
        {
            title: "Cute Depressed",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/cute-depressed.mp3?updatedAt=1747151618812"
        },
        {
            title: "Blue Horizon (Slowed)",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/blue-horizion-slowed.mp3?updatedAt=1747151633639"
        },
        {
            title: "Montagem",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/montagem.mp3?updatedAt=1747151630278"
        },
        {
            title: "Nursery Phonk",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/nursery-phonk.mp3?updatedAt=1747151626695"
        },
        {
            title: "Now You Wont Let Go",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/nowyouwontletgo.mp3?updatedAt=1747151623356"
        },
        {
            title: "Doors Elevator Music",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/audioboard-doors-elevator-music.mp3?updatedAt=1747151637755"
        },
        {
            title: "Joyful Chess (Slowed)",
            url: "https://ik.imagekit.io/ut3w2pq43i/AUDIO/joyful-chess-slowed.mp3?updatedAt=1747234161752"
        },
    ],

        "Songs": [
        {
            title: "Skyfall",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/skyfall.mp3?updatedAt=1747151760064"
        },
        {
            title: "Touch Tone Telephone",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-touch-tone-telephone.mp3?updatedAt=1747151764966"
        },
        {
            title: "2 Phut Hon",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/2-phut-hon.mp3?updatedAt=1747151768758"
        },
        {
            title: "Gangnam Style", // Corrected spelling
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/gangam-style.mp3?updatedAt=1747151772839"
        },
        {
            title: "Dekho Na Dekho",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/dekho-na-dekho.mp3?updatedAt=1747151777337"
        },
        {
            title: "My Ordinary Life",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/my-ordinary-life.mp3?updatedAt=1747151781723"
        },
        {
            title: "Bloody Mary", // Corrected spelling
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/bloody-marry.mp3?updatedAt=1747151785310"
        },
        {
            title: "NSYNC - Bye Bye Bye",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/nsync-bye-bye-bye.mp3?updatedAt=1747151789443"
        },
        {
            title: "Dusk Till Dawn",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/dusk-till-dawn.mp3?updatedAt=1747151793833"
        },
        {
            title: "Darkside",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/darkside.mp3?updatedAt=1747151797794"
        },
        {
            title: "Cradles",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/cradles.mp3?updatedAt=1747151801266"
        },
        {
            title: "Golden Hour",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/golden-hour.mp3?updatedAt=1747151805035"
        },
        {
            title: "House Of Memories",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/house-of-memories.mp3?updatedAt=1747151809195"
        },
        {
            title: "On And On And On",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/on-and-on-and-on.mp3?updatedAt=1747151812995"
        },
        {
            title: "Believer",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/believer.mp3?updatedAt=1747151816634"
        },
        {
            title: "Lovely",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/lovely.mp3?updatedAt=1747151820190"
        },
        {
            title: "Gas Gas Gas",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-gas-gas-gas.mp3?updatedAt=1747151823643"
        },
        {
            title: "Wait A Minute",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/wait-a-minute.mp3?updatedAt=1747151827298"
        },
        {
            title: "Dancin",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/dancin.mp3?updatedAt=1747151835226"
        },
        {
            title: "It's Going Down Now",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-its-going-down-now.mp3?updatedAt=1747151840027"
        },
        {
            title: "Bad Boy",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/bad-boy.mp3?updatedAt=1747151844989"
        },
        {
            title: "Middle Of The Night",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-middle-of-the-night.mp3?updatedAt=1747151848617"
        },
        {
            title: "Fairytale",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/audioboard-fairytale.mp3?updatedAt=1747151852082"
        },
        {
            title: "Cupid",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/cupid.mp3?updatedAt=1747151855929"
        },
        {
            title: "Woman",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/woman.mp3?updatedAt=1747151859656"
        },
        {
            title: "Enemy",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/enemy.mp3?updatedAt=1747151863574"
        },
        {
            title: "All My Friends Are So Toxic",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/all-my-friends-are-so-toxic.mp3?updatedAt=1747151867544"
        },
        {
            title: "Worth Nothing",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/worth-nothing.mp3?updatedAt=1747151871062"
        },
        {
            title: "Montero",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/montero.mp3?updatedAt=1747151874330"
        },
        {
            title: "Honey Pie",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/honey-pie.mp3?updatedAt=1747151878061"
        },
        {
            title: "Wildside (Anime)", // Added (Anime) for context if relevant
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/wildeside-anime.mp3?updatedAt=1747151881452"
        },
         {
            title: "Apt Apt",
            url: "https://ik.imagekit.io/ut3w2pq43i/SONG/apt-apt.mp3?updatedAt=1747234063283"
        },
    ]
};

    const categoriesContainer = document.getElementById('categoriesContainer');
    const audioPlayer = document.getElementById('audioPlayer');
    const blackScreenOverlay = document.getElementById('blackScreenOverlay');
    let currentPlayingItem = null; // DOM element of the list item
    let currentTrackObject = null; // The actual track object {title, url}

    const blackScreenPlayerControls = document.getElementById('blackScreenPlayerControls');
    const bsCurrentTrackTitle = document.getElementById('bsCurrentTrackTitle');
    const bsCurrentTime = document.getElementById('bsCurrentTime');
    const bsTotalDuration = document.getElementById('bsTotalDuration');
    const bsProgressBar = document.getElementById('bsProgressBar');
    const bsProgressBarWrapper = document.getElementById('bsProgressBarWrapper');
    const bsPlayPauseButton = document.getElementById('bsPlayPauseButton');
    const bsRestartButton = document.getElementById('bsRestartButton');
    let isDraggingProgressBar = false;

    const themes = ['theme-soft-pink', 'theme-soft-blue', 'theme-soft-green', 'theme-soft-peach'];
    let currentThemeIndex = 0;
    const themeIntervalTime = 15000; // 15 seconds

    // --- localStorage Save/Load Functions ---
    function savePlayerState() {
        if (audioPlayer.src && currentTrackObject) {
            localStorage.setItem(LS_KEYS.lastTrackUrl, audioPlayer.src);
            localStorage.setItem(LS_KEYS.lastTrackTitle, currentTrackObject.title);
            localStorage.setItem(LS_KEYS.lastPlaybackTime, audioPlayer.currentTime.toString());
        } else {
            localStorage.removeItem(LS_KEYS.lastTrackUrl);
            localStorage.removeItem(LS_KEYS.lastTrackTitle);
            localStorage.removeItem(LS_KEYS.lastPlaybackTime);
        }
    }

    function loadPlayerState() {
        const savedUrl = localStorage.getItem(LS_KEYS.lastTrackUrl);
        const savedTitle = localStorage.getItem(LS_KEYS.lastTrackTitle);
        const savedTime = parseFloat(localStorage.getItem(LS_KEYS.lastPlaybackTime));

        if (savedUrl && savedTitle) {
            currentTrackObject = { title: savedTitle, url: savedUrl };
            audioPlayer.src = savedUrl;
            bsCurrentTrackTitle.textContent = savedTitle;
            bsCurrentTime.textContent = formatTime(savedTime || 0);
            blackScreenPlayerControls.classList.add('active');
            const allTrackItems = document.querySelectorAll('.track-item');
            allTrackItems.forEach(item => {
                if (item.dataset.trackUrl === savedUrl) {
                    currentPlayingItem = item;
                }
            });
            updatePlayPauseButtonIcon(); // Update icon based on loaded (paused) state
        }

        const savedTheme = localStorage.getItem(LS_KEYS.currentTheme);
        if (savedTheme && themes.includes(savedTheme)) {
            applyTheme(savedTheme, false);
            currentThemeIndex = themes.indexOf(savedTheme);
        } else {
            applyTheme(themes[0], false);
        }
    }
    // --- End localStorage ---


    function applyTheme(themeName, save = true) {
        themes.forEach(t => document.body.classList.remove(t));
        document.body.classList.add(themeName);
        if (save) {
            localStorage.setItem(LS_KEYS.currentTheme, themeName);
        }
        currentThemeIndex = themes.indexOf(themeName);
    }

    function cycleTheme() {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
    }

    let lastTapTime = 0;
    const doubleTapDelay = 300;

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === Infinity || seconds < 0) {
            return "0:00";
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    function updatePlayPauseButtonIcon() {
        if (!bsPlayPauseButton) return;
        if (audioPlayer.paused) {
            bsPlayPauseButton.innerHTML = '▶'; // Play icon (▶)
            bsPlayPauseButton.title = 'Play';
        } else {
            bsPlayPauseButton.innerHTML = '❚❚'; // Pause icon
            bsPlayPauseButton.title = 'Pause';
        }
    }

    function populateCategoriesAndTracks() {
        categoriesContainer.innerHTML = '';
        for (const categoryName in audioCategories) {
            if (audioCategories.hasOwnProperty(categoryName)) {
                const tracks = audioCategories[categoryName];
                const categoryTitleElement = document.createElement('h2');
                categoryTitleElement.classList.add('category-title');
                categoryTitleElement.textContent = categoryName;
                categoriesContainer.appendChild(categoryTitleElement);
                const trackListUl = document.createElement('ul');
                trackListUl.classList.add('track-list');
                tracks.forEach(track => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('track-item');
                    listItem.dataset.trackUrl = track.url;
                    const titleSpan = document.createElement('span');
                    titleSpan.classList.add('track-title');
                    titleSpan.textContent = track.title;
                    const playIconContainer = document.createElement('div');
                    playIconContainer.classList.add('play-icon-container');
                    const playingIndicator = document.createElement('span');
                    playingIndicator.classList.add('currently-playing-indicator');
                    const playIconSpan = document.createElement('span');
                    playIconSpan.classList.add('play-icon');
                    playIconContainer.appendChild(playingIndicator);
                    playIconContainer.appendChild(playIconSpan);
                    listItem.appendChild(titleSpan);
                    listItem.appendChild(playIconContainer);
                    listItem.addEventListener('click', () => {
                        playTrack(track, listItem);
                    });
                    trackListUl.appendChild(listItem);
                });
                categoriesContainer.appendChild(trackListUl);
            }
        }
        loadPlayerState();
    }

    function playTrack(trackObject, listItemElement) {
        bsCurrentTrackTitle.textContent = trackObject.title;
        currentTrackObject = trackObject;

        if (currentPlayingItem === listItemElement && !audioPlayer.paused) {
            audioPlayer.pause();
        } else if (audioPlayer.src === trackObject.url && audioPlayer.paused && currentPlayingItem === listItemElement) {
            audioPlayer.play()
                .then(() => {
                    showBlackScreen();
                    blackScreenPlayerControls.classList.add('active');
                })
                .catch(error => handlePlayError(error, listItemElement));
        } else {
            if (currentPlayingItem) {
                currentPlayingItem.classList.remove('playing');
            }
            audioPlayer.src = trackObject.url;
            localStorage.setItem(LS_KEYS.lastTrackUrl, trackObject.url);
            localStorage.setItem(LS_KEYS.lastTrackTitle, trackObject.title);
            localStorage.setItem(LS_KEYS.lastPlaybackTime, '0');

            bsCurrentTime.textContent = "0:00";
            bsTotalDuration.textContent = "0:00";
            bsProgressBar.style.width = "0%";

            audioPlayer.play()
                .then(() => {
                    showBlackScreen();
                    currentPlayingItem = listItemElement;
                    blackScreenPlayerControls.classList.add('active');
                })
                .catch(error => handlePlayError(error, listItemElement));
        }
        updatePlayPauseButtonIcon(); // Ensure button is updated immediately
    }

    function handlePlayError(error, listItemElementOnError) {
        console.error("Error playing audio:", error);
        blackScreenPlayerControls.classList.remove('active');
        bsCurrentTrackTitle.textContent = "Error loading track";
        if (listItemElementOnError && listItemElementOnError.classList.contains('playing')) {
             listItemElementOnError.classList.remove('playing');
        } else if (currentPlayingItem) {
            currentPlayingItem.classList.remove('playing');
        }
        currentPlayingItem = null;
        currentTrackObject = null;
        updatePlayPauseButtonIcon(); // Reset to play icon
        savePlayerState();
    }

    function showBlackScreen() {
        blackScreenOverlay.classList.add('visible');
    }

    function hideBlackScreen() {
        blackScreenOverlay.classList.remove('visible');
    }

    blackScreenOverlay.addEventListener('click', (event) => {
        if (event.target.closest('.black-screen-player-controls')) {
            return;
        }
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime < doubleTapDelay) {
            if (!audioPlayer.paused) {
                 audioPlayer.pause();
            }
            hideBlackScreen();
            lastTapTime = 0;
        } else {
            lastTapTime = currentTime;
        }
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        bsTotalDuration.textContent = formatTime(audioPlayer.duration);
        if (audioPlayer.src) {
            blackScreenPlayerControls.classList.add('active');
        }
        const savedTime = parseFloat(localStorage.getItem(LS_KEYS.lastPlaybackTime));
        if (audioPlayer.src === localStorage.getItem(LS_KEYS.lastTrackUrl) && savedTime && !isNaN(savedTime) && savedTime > 0) {
            audioPlayer.currentTime = savedTime;
            bsCurrentTime.textContent = formatTime(savedTime);
            const progressPercentage = (savedTime / audioPlayer.duration) * 100;
            bsProgressBar.style.width = `${progressPercentage}%`;
        }
        updatePlayPauseButtonIcon();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        bsCurrentTime.textContent = formatTime(currentTime);
        if (audioPlayer.duration && !isDraggingProgressBar) {
            const progressPercentage = (currentTime / audioPlayer.duration) * 100;
            bsProgressBar.style.width = `${progressPercentage}%`;
        } else if (!audioPlayer.duration && !isDraggingProgressBar) {
            bsProgressBar.style.width = `0%`;
        }
    });

    audioPlayer.addEventListener('ended', () => {
        hideBlackScreen();
        if (currentPlayingItem) {
            currentPlayingItem.classList.remove('playing');
        }
        // Keep controls active if we want to allow replay from a hidden black screen state conceptually
        // blackScreenPlayerControls.classList.remove('active'); 

        if (currentTrackObject) {
             bsCurrentTrackTitle.textContent = currentTrackObject.title;
        } else {
             bsCurrentTrackTitle.textContent = "Track ended";
        }
        bsCurrentTime.textContent = formatTime(audioPlayer.duration);
        bsProgressBar.style.width = "100%";
        audioPlayer.currentTime = 0;
        audioPlayer.pause(); // Explicitly pause

        updatePlayPauseButtonIcon(); // Set to '▶'
        localStorage.setItem(LS_KEYS.lastPlaybackTime, '0');
    });

    audioPlayer.addEventListener('pause', () => {
        if (currentPlayingItem) {
            currentPlayingItem.classList.remove('playing');
        }
        updatePlayPauseButtonIcon();
        savePlayerState();
    });

    audioPlayer.addEventListener('play', () => {
        if (currentPlayingItem) {
            currentPlayingItem.classList.add('playing');
        }
        if (audioPlayer.src) {
             blackScreenPlayerControls.classList.add('active');
        }
        updatePlayPauseButtonIcon();
    });

    audioPlayer.addEventListener('error', (e) => {
        console.error('Audio Player Error:', e);
        handlePlayError("Audio player encountered an error.", currentPlayingItem);
    });

    function seek(event) {
        if (!audioPlayer.duration || isNaN(audioPlayer.duration)) return;
        const progressBarRect = bsProgressBarWrapper.getBoundingClientRect();
        let clickX = event.clientX;
        if (event.type.startsWith('touch')) {
            clickX = event.touches[0].clientX;
        }
        let percentage = (clickX - progressBarRect.left) / progressBarRect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        const newTime = percentage * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
        bsProgressBar.style.width = `${percentage * 100}%`;
        bsCurrentTime.textContent = formatTime(newTime);
        savePlayerState();
    }

    bsProgressBarWrapper.addEventListener('mousedown', (e) => { isDraggingProgressBar = true; seek(e); document.body.style.userSelect = 'none'; });
    document.addEventListener('mousemove', (e) => { if (isDraggingProgressBar) { seek(e); } });
    document.addEventListener('mouseup', () => { if (isDraggingProgressBar) { isDraggingProgressBar = false; document.body.style.userSelect = ''; } });
    document.addEventListener('mouseleave', () => { if (isDraggingProgressBar) { isDraggingProgressBar = false; document.body.style.userSelect = ''; } });
    bsProgressBarWrapper.addEventListener('touchstart', (e) => { isDraggingProgressBar = true; seek(e); e.preventDefault(); }, { passive: false });
    document.addEventListener('touchmove', (e) => { if (isDraggingProgressBar) { seek(e); } }, { passive: false });
    document.addEventListener('touchend', () => { if (isDraggingProgressBar) { isDraggingProgressBar = false; } });

    // Event listeners for new black screen controls
    if (bsPlayPauseButton) {
        bsPlayPauseButton.addEventListener('click', () => {
            if (!audioPlayer.src || !currentTrackObject) return; // No track loaded
            if (audioPlayer.paused) {
                audioPlayer.play().catch(error => handlePlayError(error, currentPlayingItem));
            } else {
                audioPlayer.pause();
            }
            // updatePlayPauseButtonIcon(); // Handled by 'play'/'pause' events
        });
    }

    if (bsRestartButton) {
        bsRestartButton.addEventListener('click', () => {
            if (!audioPlayer.src || !currentTrackObject) return; // No track loaded
            audioPlayer.currentTime = 0;
            if (audioPlayer.paused) { // If was paused, play from start
                audioPlayer.play().catch(error => handlePlayError(error, currentPlayingItem));
            }
            // If it was already playing, it will continue from start.
            // updatePlayPauseButtonIcon(); // Handled by 'play' event if it plays
        });
    }

    window.addEventListener('beforeunload', () => {
        if (audioPlayer.src && !audioPlayer.paused) {
            savePlayerState();
        }
    });

    // --- Initialize ---
    updatePlayPauseButtonIcon(); // Set initial state for the button
    populateCategoriesAndTracks(); // This will also call loadPlayerState
    setInterval(cycleTheme, themeIntervalTime);
});