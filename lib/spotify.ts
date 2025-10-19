// Spotify Web API client
// This file contains the main Spotify API client implementation

export interface SpotifyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface SpotifyTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export class SpotifyAPI {
  private config: SpotifyConfig;
  private tokens: SpotifyTokens | null = null;

  constructor(config: SpotifyConfig) {
    this.config = config;
  }

  setTokens(tokens: SpotifyTokens) {
    this.tokens = tokens;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.tokens?.accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.tokens.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // User Profile
  async getCurrentUser() {
    return this.makeRequest('/me');
  }

  // Playlists
  async getUserPlaylists(limit = 20, offset = 0) {
    return this.makeRequest(`/me/playlists?limit=${limit}&offset=${offset}`);
  }

  async getPlaylist(playlistId: string) {
    return this.makeRequest(`/playlists/${playlistId}`);
  }

  async getPlaylistTracks(playlistId: string, limit = 20, offset = 0) {
    return this.makeRequest(`/playlists/${playlistId}/tracks?limit=${limit}&offset=${offset}`);
  }

  // Albums
  async getUserAlbums(limit = 20, offset = 0) {
    return this.makeRequest(`/me/albums?limit=${limit}&offset=${offset}`);
  }

  async getAlbum(albumId: string) {
    return this.makeRequest(`/albums/${albumId}`);
  }

  async getAlbumTracks(albumId: string, limit = 20, offset = 0) {
    return this.makeRequest(`/albums/${albumId}/tracks?limit=${limit}&offset=${offset}`);
  }

  // Tracks
  async getUserTracks(limit = 20, offset = 0) {
    return this.makeRequest(`/me/tracks?limit=${limit}&offset=${offset}`);
  }

  async getTrack(trackId: string) {
    return this.makeRequest(`/tracks/${trackId}`);
  }

  // Search
  async search(query: string, types: string[] = ['track', 'album', 'playlist', 'artist'], limit = 20) {
    const params = new URLSearchParams({
      q: query,
      type: types.join(','),
      limit: limit.toString(),
    });
    return this.makeRequest(`/search?${params}`);
  }

  // Playback
  async getPlaybackState() {
    return this.makeRequest('/me/player');
  }

  async play(trackUri?: string, contextUri?: string) {
    return this.makeRequest('/me/player/play', {
      method: 'PUT',
      body: JSON.stringify({
        uris: trackUri ? [trackUri] : undefined,
        context_uri: contextUri,
      }),
    });
  }

  async pause() {
    return this.makeRequest('/me/player/pause', {
      method: 'PUT',
    });
  }

  async next() {
    return this.makeRequest('/me/player/next', {
      method: 'POST',
    });
  }

  async previous() {
    return this.makeRequest('/me/player/previous', {
      method: 'POST',
    });
  }

  async seek(positionMs: number) {
    return this.makeRequest(`/me/player/seek?position_ms=${positionMs}`, {
      method: 'PUT',
    });
  }

  async setVolume(volumePercent: number) {
    return this.makeRequest(`/me/player/volume?volume_percent=${volumePercent}`, {
      method: 'PUT',
    });
  }

  // Recently Played
  async getRecentlyPlayed(limit = 20) {
    return this.makeRequest(`/me/player/recently-played?limit=${limit}`);
  }

  // Top Items
  async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 20) {
    return this.makeRequest(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  }

  async getTopArtists(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit = 20) {
    return this.makeRequest(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
  }
}

// Create singleton instance
export const spotifyAPI = new SpotifyAPI({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
  redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
});
