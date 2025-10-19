import { Track, Album, Playlist, Artist, User, SearchResults } from '@/types';

// Mock Artists
export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Frank Ocean',
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    genres: ['R&B', 'Hip-Hop', 'Alternative R&B'],
    popularity: 85
  },
  {
    id: 'artist-2',
    name: 'Kid Cudi',
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    genres: ['Hip-Hop', 'Alternative Hip-Hop', 'Rap'],
    popularity: 80
  },
  {
    id: 'artist-3',
    name: 'Asha Bhosle',
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    genres: ['Bollywood', 'Classical', 'World'],
    popularity: 90
  },
  {
    id: 'artist-4',
    name: 'Arijit Singh',
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    genres: ['Bollywood', 'Pop', 'Romantic'],
    popularity: 95
  },
  {
    id: 'artist-5',
    name: 'Cheema Y',
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    genres: ['Hip-Hop', 'Punjabi', 'Rap'],
    popularity: 70
  }
];

// Mock Albums
export const mockAlbums: Album[] = [
  {
    id: 'album-1',
    name: 'Blonde',
    artists: [mockArtists[0]],
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    release_date: '2016-08-20',
    total_tracks: 17,
    tracks: [],
    album_type: 'album',
    popularity: 90,
    external_urls: { spotify: 'https://open.spotify.com/album/3mH6qwIy9crq0I9YQbOuDf' }
  },
  {
    id: 'album-2',
    name: 'Entergalactic',
    artists: [mockArtists[1]],
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    release_date: '2022-09-30',
    total_tracks: 12,
    tracks: [],
    album_type: 'album',
    popularity: 75,
    external_urls: { spotify: 'https://open.spotify.com/album/4CWJ2WFTQ2fN8s5VW8c1FA' }
  },
  {
    id: 'album-3',
    name: 'Queen',
    artists: [mockArtists[2], mockArtists[3]],
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    release_date: '2014-03-07',
    total_tracks: 12,
    tracks: [],
    album_type: 'album',
    popularity: 85,
    external_urls: { spotify: 'https://open.spotify.com/album/1qY5jQ1iKvllmD5QZ9tDzO' }
  }
];

// Mock Tracks
export const mockTracks: Track[] = [
  {
    id: 'track-1',
    name: 'Hungama Ho Gaya (From "Queen")',
    artists: [mockArtists[2], mockArtists[3]],
    album: mockAlbums[2],
    duration_ms: 272000,
    preview_url: null,
    track_number: 1,
    disc_number: 1,
    explicit: false,
    popularity: 88,
    external_urls: { spotify: 'https://open.spotify.com/track/1' }
  },
  {
    id: 'track-2',
    name: 'Entergalactic',
    artists: [mockArtists[1]],
    album: mockAlbums[1],
    duration_ms: 180000,
    preview_url: null,
    track_number: 1,
    disc_number: 1,
    explicit: false,
    popularity: 75,
    external_urls: { spotify: 'https://open.spotify.com/track/2' }
  },
  {
    id: 'track-3',
    name: 'The Simpsons',
    artists: [mockArtists[4]],
    album: {
      id: 'album-4',
      name: 'The Simpsons',
      artists: [mockArtists[4]],
      images: [{ url: '/img/cover.jpg', width: 640, height: 640 }],
      release_date: '2023-01-01',
      total_tracks: 8,
      tracks: [],
      album_type: 'album',
      popularity: 70,
      external_urls: { spotify: 'https://open.spotify.com/album/4' }
    },
    duration_ms: 240000,
    preview_url: null,
    track_number: 1,
    disc_number: 1,
    explicit: true,
    popularity: 70,
    external_urls: { spotify: 'https://open.spotify.com/track/3' }
  },
  {
    id: 'track-4',
    name: 'Nights',
    artists: [mockArtists[0]],
    album: mockAlbums[0],
    duration_ms: 300000,
    preview_url: null,
    track_number: 12,
    disc_number: 1,
    explicit: false,
    popularity: 92,
    external_urls: { spotify: 'https://open.spotify.com/track/4' }
  },
  {
    id: 'track-5',
    name: 'Self Control',
    artists: [mockArtists[0]],
    album: mockAlbums[0],
    duration_ms: 200000,
    preview_url: null,
    track_number: 8,
    disc_number: 1,
    explicit: false,
    popularity: 89,
    external_urls: { spotify: 'https://open.spotify.com/track/5' }
  },
  {
    id: 'track-6',
    name: 'Pink + White',
    artists: [mockArtists[0]],
    album: mockAlbums[0],
    duration_ms: 180000,
    preview_url: null,
    track_number: 3,
    disc_number: 1,
    explicit: false,
    popularity: 87,
    external_urls: { spotify: 'https://open.spotify.com/track/6' }
  }
];

// Mock Playlists
export const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    name: 'Death',
    description: 'Songs that hit different',
    owner: {
      id: 'user-1',
      display_name: 'Aish'
    },
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    tracks: {
      total: 25,
      items: mockTracks.slice(0, 3).map(track => ({ track }))
    },
    public: true,
    collaborative: false,
    external_urls: { spotify: 'https://open.spotify.com/playlist/1' }
  },
  {
    id: 'playlist-2',
    name: 'Khichkeee',
    description: 'Random vibes',
    owner: {
      id: 'user-1',
      display_name: 'Aish'
    },
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    tracks: {
      total: 15,
      items: mockTracks.slice(1, 4).map(track => ({ track }))
    },
    public: true,
    collaborative: false,
    external_urls: { spotify: 'https://open.spotify.com/playlist/2' }
  },
  {
    id: 'playlist-3',
    name: 'Liked Songs',
    description: 'Songs you liked',
    owner: {
      id: 'user-1',
      display_name: 'You'
    },
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    tracks: {
      total: 2136,
      items: mockTracks.map(track => ({ track }))
    },
    public: false,
    collaborative: false,
    external_urls: { spotify: 'https://open.spotify.com/playlist/3' }
  },
  {
    id: 'playlist-4',
    name: 'Frank Ocean Best',
    description: 'The best of Frank Ocean',
    owner: {
      id: 'user-2',
      display_name: 'patriaaaaaaa'
    },
    images: [
      { url: '/img/cover.jpg', width: 640, height: 640 },
      { url: '/img/cover.jpg', width: 300, height: 300 },
      { url: '/img/cover.jpg', width: 64, height: 64 }
    ],
    tracks: {
      total: 20,
      items: mockTracks.filter(track => track.artists.some(artist => artist.name === 'Frank Ocean')).map(track => ({ track }))
    },
    public: true,
    collaborative: false,
    external_urls: { spotify: 'https://open.spotify.com/playlist/4' }
  }
];

// Mock User
export const mockUser: User = {
  id: 'user-1',
  display_name: 'Aish',
  email: 'aish@example.com',
  images: [
    { url: '/img/cover.jpg', width: 640, height: 640 },
    { url: '/img/cover.jpg', width: 300, height: 300 },
    { url: '/img/cover.jpg', width: 64, height: 64 }
  ],
  country: 'US',
  followers: { total: 150 },
  external_urls: { spotify: 'https://open.spotify.com/user/user-1' }
};

// Featured Content
export const featuredPlaylist = {
  id: 'featured-1',
  name: 'The Viral 100 🔥 Best Trending...',
  description: 'Listen Now for all the Viral Hits right here!',
  cover: '/img/cover.jpg',
  gradient: 'linear-gradient(135deg, #450a0a, #7c2d12)',
  tracks: mockTracks.slice(0, 6)
};

export const madeForYou = [
  {
    id: 'mfy-1',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist' as const
  },
  {
    id: 'mfy-2',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist' as const
  },
  {
    id: 'mfy-3',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist' as const
  }
];

// Utility Functions
export const getTrackById = (id: string): Track | undefined => {
  return mockTracks.find(track => track.id === id);
};

export const getAlbumById = (id: string): Album | undefined => {
  return mockAlbums.find(album => album.id === id);
};

export const getPlaylistById = (id: string): Playlist | undefined => {
  return mockPlaylists.find(playlist => playlist.id === id);
};

export const getArtistById = (id: string): Artist | undefined => {
  return mockArtists.find(artist => artist.id === id);
};

export const searchAll = (query: string): SearchResults => {
  const lowercaseQuery = query.toLowerCase();
  
  const tracks = mockTracks.filter(track => 
    track.name.toLowerCase().includes(lowercaseQuery) ||
    track.artists.some(artist => artist.name.toLowerCase().includes(lowercaseQuery)) ||
    track.album.name.toLowerCase().includes(lowercaseQuery)
  );
  
  const albums = mockAlbums.filter(album =>
    album.name.toLowerCase().includes(lowercaseQuery) ||
    album.artists.some(artist => artist.name.toLowerCase().includes(lowercaseQuery))
  );
  
  const playlists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(lowercaseQuery) ||
    playlist.description.toLowerCase().includes(lowercaseQuery)
  );
  
  const artists = mockArtists.filter(artist =>
    artist.name.toLowerCase().includes(lowercaseQuery) ||
    artist.genres.some(genre => genre.toLowerCase().includes(lowercaseQuery))
  );
  
  return {
    tracks: { items: tracks, total: tracks.length },
    albums: { items: albums, total: albums.length },
    playlists: { items: playlists, total: playlists.length },
    artists: { items: artists, total: artists.length }
  };
};

// Legacy compatibility (for existing components)
export const mockSongs = mockTracks.map(track => ({
  id: track.id,
  title: track.name,
  artist: track.artists.map(a => a.name).join(', '),
  album: track.album.name,
  duration: Math.floor(track.duration_ms / 1000),
  cover: track.album.images[0]?.url || '/img/cover.jpg',
  isPlaying: false
}));

export const mockPlaylistsLegacy = mockPlaylists.map(playlist => ({
  id: playlist.id,
  name: playlist.name,
  type: 'playlist' as const,
  owner: playlist.owner.display_name,
  songCount: playlist.tracks.total,
  cover: playlist.images[0]?.url || '/img/cover.jpg',
  songs: playlist.tracks.items.map(item => ({
    id: item.track.id,
    title: item.track.name,
    artist: item.track.artists.map(a => a.name).join(', '),
    album: item.track.album.name,
    duration: Math.floor(item.track.duration_ms / 1000),
    cover: item.track.album.images[0]?.url || '/img/cover.jpg'
  }))
}));