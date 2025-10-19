// Spotify Clone JavaScript Functionality

// Current song data
let currentSong = {
    title: "Hungama Ho Gaya (From \"Queen\")",
    artist: "Asha Bhosle, Arijit Singh",
    isPlaying: false,
    currentTime: 106, // 1:46 in seconds
    duration: 272, // 4:32 in seconds
    volume: 50
};

// Sample songs data
const songs = [
    {
        title: "Hungama Ho Gaya (From \"Queen\")",
        artist: "Asha Bhosle, Arijit Singh",
        cover: "playlist-cover-9"
    },
    {
        title: "Entergalactic",
        artist: "Kid Cudi",
        cover: "album-cover-1"
    },
    {
        title: "The Simpsons",
        artist: "Cheema Y",
        cover: "album-cover-2"
    },
    {
        title: "channel ORANGE",
        artist: "Frank Ocean",
        cover: "album-cover-3"
    },
    {
        title: "AURA",
        artist: "Frank Ocean",
        cover: "album-cover-4"
    },
    {
        title: "the frank ocean songs",
        artist: "Aish",
        cover: "album-cover-5"
    },
    {
        title: "P-POP CULTURE",
        artist: "Various Artists",
        cover: "album-cover-6"
    },
    {
        title: "Blonde",
        artist: "Frank Ocean",
        cover: "album-cover-7"
    },
    {
        title: "Frank Ocean",
        artist: "Frank Ocean",
        cover: "album-cover-8"
    }
];

// DOM Elements
const playPauseBtn = document.querySelector('.play-pause-btn img');
const currentSongTitle = document.querySelector('.song-title');
const currentSongArtist = document.querySelector('.song-artist');
const currentSongCover = document.querySelector('.current-song-cover');
const currentTimeDisplay = document.querySelector('.current-time');
const totalTimeDisplay = document.querySelector('.total-time');
const progressFill = document.querySelector('.progress-fill');
const progressBar = document.querySelector('.progress-bar');
const volumeSlider = document.querySelector('.volume-slider input');
const contentItems = document.querySelectorAll('.content-item');
const playlistItems = document.querySelectorAll('.playlist-item');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializePlayer();
    setupEventListeners();
    updateDisplay();
});

// Initialize player
function initializePlayer() {
    // Set initial volume
    volumeSlider.value = currentSong.volume;
    
    // Update time display
    updateTimeDisplay();
    
    // Update progress bar
    updateProgressBar();
}

// Setup event listeners
function setupEventListeners() {
    // Play/Pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // Volume slider
    if (volumeSlider) {
        volumeSlider.addEventListener('input', handleVolumeChange);
    }
    
    // Content items (album/playlist cards)
    contentItems.forEach((item, index) => {
        item.addEventListener('click', () => switchSong(index));
    });
    
    // Playlist items in sidebar
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => switchSong(index));
    });
    
    // Progress bar click
    if (progressBar) {
        progressBar.addEventListener('click', handleProgressClick);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Toggle play/pause
function togglePlayPause() {
    currentSong.isPlaying = !currentSong.isPlaying;
    updatePlayPauseIcon();
    
    if (currentSong.isPlaying) {
        console.log('Playing:', currentSong.title);
        // Here you would start actual audio playback
        simulatePlayback();
    } else {
        console.log('Paused:', currentSong.title);
        // Here you would pause actual audio playback
    }
}

// Update play/pause icon
function updatePlayPauseIcon() {
    if (playPauseBtn) {
        if (currentSong.isPlaying) {
            playPauseBtn.src = 'img/pause.svg';
            playPauseBtn.alt = 'pause';
        } else {
            playPauseBtn.src = 'img/play.svg';
            playPauseBtn.alt = 'play';
        }
    }
}

// Switch song
function switchSong(songIndex) {
    if (songIndex < songs.length) {
        const song = songs[songIndex];
        currentSong.title = song.title;
        currentSong.artist = song.artist;
        currentSong.isPlaying = false; // Reset to paused when switching
        
        updateDisplay();
        updatePlayPauseIcon();
        
        console.log('Switched to:', song.title);
    }
}

// Update display with current song
function updateDisplay() {
    // Update playbar
    if (currentSongTitle) {
        currentSongTitle.textContent = currentSong.title;
    }
    if (currentSongArtist) {
        currentSongArtist.textContent = currentSong.artist;
    }
    
    // Update right sidebar
    const rightSidebarTitle = document.querySelector('.current-song h3');
    const rightSidebarDetails = document.querySelector('.song-details h4');
    const rightSidebarArtist = document.querySelector('.song-details p');
    
    if (rightSidebarTitle) {
        rightSidebarTitle.textContent = currentSong.title;
    }
    if (rightSidebarDetails) {
        rightSidebarDetails.textContent = currentSong.title + ' ✓';
    }
    if (rightSidebarArtist) {
        rightSidebarArtist.textContent = currentSong.artist;
    }
    
    // Update cover art (simulate with different gradients)
    updateCoverArt();
}

// Update cover art based on current song
function updateCoverArt() {
    const cover = document.querySelector('.current-song-cover');
    if (cover) {
        // Remove existing classes
        cover.className = 'current-song-cover';
        
        // Add appropriate cover class based on song
        const songIndex = songs.findIndex(song => song.title === currentSong.title);
        if (songIndex !== -1) {
            cover.classList.add(songs[songIndex].cover);
        }
    }
}

// Handle volume change
function handleVolumeChange(event) {
    currentSong.volume = event.target.value;
    console.log('Volume changed to:', currentSong.volume + '%');
    
    // Here you would update actual audio volume
    // audioElement.volume = currentSong.volume / 100;
}

// Handle progress bar click
function handleProgressClick(event) {
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * currentSong.duration;
    
    currentSong.currentTime = Math.max(0, Math.min(newTime, currentSong.duration));
    updateTimeDisplay();
    updateProgressBar();
    
    console.log('Seeked to:', formatTime(currentSong.currentTime));
}

// Update time display
function updateTimeDisplay() {
    if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(currentSong.currentTime);
    }
    if (totalTimeDisplay) {
        totalTimeDisplay.textContent = formatTime(currentSong.duration);
    }
}

// Update progress bar
function updateProgressBar() {
    if (progressFill) {
        const percentage = (currentSong.currentTime / currentSong.duration) * 100;
        progressFill.style.width = percentage + '%';
    }
}

// Format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Simulate playback (for demo purposes)
function simulatePlayback() {
    if (currentSong.isPlaying) {
        const interval = setInterval(() => {
            if (!currentSong.isPlaying) {
                clearInterval(interval);
                return;
            }
            
            currentSong.currentTime += 1;
            if (currentSong.currentTime >= currentSong.duration) {
                currentSong.currentTime = currentSong.duration;
                currentSong.isPlaying = false;
                updatePlayPauseIcon();
                clearInterval(interval);
            }
            
            updateTimeDisplay();
            updateProgressBar();
        }, 1000);
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            // Previous song
            break;
        case 'ArrowRight':
            event.preventDefault();
            // Next song
            break;
        case 'ArrowUp':
            event.preventDefault();
            // Volume up
            volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 5);
            handleVolumeChange({ target: volumeSlider });
            break;
        case 'ArrowDown':
            event.preventDefault();
            // Volume down
            volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 5);
            handleVolumeChange({ target: volumeSlider });
            break;
    }
}

// Add hover effects for content items
contentItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add click effects for playlist items
playlistItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        playlistItems.forEach(plItem => plItem.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Add visual feedback
        this.style.backgroundColor = '#1db954';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
    });
});

console.log('Spotify Clone JavaScript loaded successfully!');
