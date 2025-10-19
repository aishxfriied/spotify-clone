export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  cover: string;
  isPlaying?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  type: 'playlist' | 'album';
  owner: string;
  songCount?: number;
  cover: string;
  songs: Song[];
}

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Hungama Ho Gaya (From "Queen")',
    artist: 'Asha Bhosle, Arijit Singh',
    album: 'Queen',
    duration: 272, // 4:32
    cover: '/img/cover.jpg',
    isPlaying: true
  },
  {
    id: '2',
    title: 'Entergalactic',
    artist: 'Kid Cudi',
    album: 'Entergalactic',
    duration: 180,
    cover: '/img/cover.jpg'
  },
  {
    id: '3',
    title: 'The Simpsons',
    artist: 'Cheema Y',
    album: 'The Simpsons',
    duration: 240,
    cover: '/img/cover.jpg'
  },
  {
    id: '4',
    title: 'channel ORANGE',
    artist: 'Frank Ocean',
    album: 'channel ORANGE',
    duration: 300,
    cover: '/img/cover.jpg'
  },
  {
    id: '5',
    title: 'AURA',
    artist: 'Frank Ocean',
    album: 'AURA',
    duration: 200,
    cover: '/img/cover.jpg'
  },
  {
    id: '6',
    title: 'the frank ocean songs',
    artist: 'Aish',
    album: 'Frank Ocean Collection',
    duration: 180,
    cover: '/img/cover.jpg'
  },
  {
    id: '7',
    title: 'P-POP CULTURE',
    artist: 'Various Artists',
    album: 'P-POP CULTURE',
    duration: 220,
    cover: '/img/cover.jpg'
  },
  {
    id: '8',
    title: 'Blonde',
    artist: 'Frank Ocean',
    album: 'Blonde',
    duration: 280,
    cover: '/img/cover.jpg'
  },
  {
    id: '9',
    title: 'Frank Ocean',
    artist: 'Frank Ocean',
    album: 'Frank Ocean',
    duration: 260,
    cover: '/img/cover.jpg'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Death',
    type: 'playlist',
    owner: 'Aish',
    songCount: 25,
    cover: '/img/cover.jpg',
    songs: mockSongs.slice(0, 3)
  },
  {
    id: '2',
    name: 'Khichkeee',
    type: 'playlist',
    owner: 'Aish',
    songCount: 15,
    cover: '/img/cover.jpg',
    songs: mockSongs.slice(1, 4)
  },
  {
    id: '3',
    name: 'Retro',
    type: 'playlist',
    owner: 'Aish',
    songCount: 30,
    cover: '/img/cover.jpg',
    songs: mockSongs.slice(2, 5)
  },
  {
    id: '4',
    name: 'Liked Songs',
    type: 'playlist',
    owner: 'You',
    songCount: 2136,
    cover: '/img/cover.jpg',
    songs: mockSongs
  },
  {
    id: '5',
    name: 'Entergalactic',
    type: 'album',
    owner: 'Kid Cudi',
    songCount: 12,
    cover: '/img/cover.jpg',
    songs: [mockSongs[1]]
  },
  {
    id: '6',
    name: 'The Simpsons',
    type: 'album',
    owner: 'Cheema Y',
    songCount: 8,
    cover: '/img/cover.jpg',
    songs: [mockSongs[2]]
  },
  {
    id: '7',
    name: 'the frank ocean songs',
    type: 'playlist',
    owner: 'Aish',
    songCount: 45,
    cover: '/img/cover.jpg',
    songs: mockSongs.filter(song => song.artist.includes('Frank Ocean'))
  },
  {
    id: '8',
    name: 'frank ocean best songs',
    type: 'playlist',
    owner: 'patriaaaaaaa',
    songCount: 20,
    cover: '/img/cover.jpg',
    songs: mockSongs.filter(song => song.artist.includes('Frank Ocean'))
  },
  {
    id: '9',
    name: 'saddest frank ocean songs',
    type: 'playlist',
    owner: 'simranbat',
    songCount: 12,
    cover: '/img/cover.jpg',
    songs: mockSongs.filter(song => song.artist.includes('Frank Ocean'))
  },
  {
    id: '10',
    name: 'Electric Club',
    type: 'playlist',
    owner: 'Oohftfinyre25gcuz4xjtf8ng',
    songCount: 35,
    cover: '/img/cover.jpg',
    songs: mockSongs.slice(0, 5)
  }
];

export const featuredPlaylist = {
  id: 'featured-1',
  name: 'The Viral 100 🔥 Best Trending...',
  description: 'Listen Now for all the Viral Hits right here!',
  cover: '/img/cover.jpg',
  gradient: 'linear-gradient(135deg, #450a0a, #7c2d12)',
  songs: mockSongs.slice(0, 6)
};

export const madeForYou = [
  {
    id: 'mfy-1',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist'
  },
  {
    id: 'mfy-2',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist'
  },
  {
    id: 'mfy-3',
    name: 'Made For Aish',
    cover: '/img/cover.jpg',
    type: 'playlist'
  }
];
