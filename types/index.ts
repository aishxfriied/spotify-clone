export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  genres: string[];
  popularity: number;
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  preview_url: string | null;
  track_number: number;
  disc_number: number;
  explicit: boolean;
  popularity: number;
  external_urls: {
    spotify: string;
  };
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  release_date: string;
  total_tracks: number;
  tracks: Track[];
  album_type: 'album' | 'single' | 'compilation';
  popularity: number;
  external_urls: {
    spotify: string;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  owner: {
    id: string;
    display_name: string;
  };
  images: Image[];
  tracks: {
    total: number;
    items: Array<{
      track: Track;
    }>;
  };
  public: boolean;
  collaborative: boolean;
  external_urls: {
    spotify: string;
  };
}

export interface User {
  id: string;
  display_name: string;
  email: string;
  images: Image[];
  country: string;
  followers: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SearchResults {
  tracks: {
    items: Track[];
    total: number;
  };
  albums: {
    items: Album[];
    total: number;
  };
  playlists: {
    items: Playlist[];
    total: number;
  };
  artists: {
    items: Artist[];
    total: number;
  };
}

// Player Context Types
export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Track[];
  queueIndex: number;
  repeat: 'off' | 'track' | 'context';
  shuffle: boolean;
}

export interface PlayerActions {
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (tracks: Track[]) => void;
  clearQueue: () => void;
  setRepeat: (repeat: PlayerState['repeat']) => void;
  setShuffle: (shuffle: boolean) => void;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    error: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Component Props Types
export interface CardProps {
  id: string;
  name: string;
  image: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
}

export interface PlaylistItemProps {
  playlist: Playlist;
  isActive?: boolean;
  onClick?: () => void;
}

export interface TrackItemProps {
  track: Track;
  isActive?: boolean;
  isPlaying?: boolean;
  onClick?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

