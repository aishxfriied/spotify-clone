// Main Spotify hook for accessing Spotify functionality
// This hook provides a clean interface for Spotify API operations

import { useState, useEffect, useCallback } from 'react';
import { spotifyAPI } from '@/lib/spotify';

export interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; width: number; height: number }>;
  country: string;
  followers: { total: number };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  owner: {
    id: string;
    display_name: string;
  };
  images: Array<{ url: string; width: number; height: number }>;
  tracks: {
    total: number;
    items: Array<{ track: any }>;
  };
  public: boolean;
  collaborative: boolean;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; width: number; height: number }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
}

export interface SpotifySearchResults {
  tracks: { items: SpotifyTrack[]; total: number };
  albums: { items: any[]; total: number };
  playlists: { items: SpotifyPlaylist[]; total: number };
  artists: { items: any[]; total: number };
}

export function useSpotify() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we have tokens in localStorage
        const tokens = localStorage.getItem('spotify_tokens');
        if (tokens) {
          const parsedTokens = JSON.parse(tokens);
          spotifyAPI.setTokens(parsedTokens);
          
          // Verify token is still valid by getting user profile
          const userProfile = await spotifyAPI.getCurrentUser();
          setUser(userProfile);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // Clear invalid tokens
        localStorage.removeItem('spotify_tokens');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || 'http://localhost:3000/api/auth/callback/spotify';
    
    if (!clientId) {
      setError('Spotify Client ID not configured');
      return;
    }

    // Generate PKCE parameters
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    
    // Store code verifier for later use
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    
    // Build authorization URL
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('code_challenge_method', 'S256');
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('scope', [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-library-read',
      'user-top-read',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing'
    ].join(' '));
    
    // Redirect to Spotify authorization
    window.location.href = authUrl.toString();
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('spotify_tokens');
    localStorage.removeItem('spotify_code_verifier');
    setIsAuthenticated(false);
    setUser(null);
    setPlaylists([]);
    setTracks([]);
    setAlbums([]);
    setError(null);
  }, []);

  // Load user playlists
  const loadPlaylists = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const response = await spotifyAPI.getUserPlaylists(50);
      setPlaylists(response.items);
    } catch (error) {
      console.error('Failed to load playlists:', error);
      setError('Failed to load playlists');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load user tracks
  const loadTracks = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const response = await spotifyAPI.getUserTracks(50);
      setTracks(response.items.map((item: any) => item.track));
    } catch (error) {
      console.error('Failed to load tracks:', error);
      setError('Failed to load tracks');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Load user albums
  const loadAlbums = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const response = await spotifyAPI.getUserAlbums(50);
      setAlbums(response.items.map((item: any) => item.album));
    } catch (error) {
      console.error('Failed to load albums:', error);
      setError('Failed to load albums');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Search function
  const search = useCallback(async (query: string, types: string[] = ['track', 'album', 'playlist', 'artist']) => {
    if (!isAuthenticated || !query.trim()) return null;
    
    try {
      setIsLoading(true);
      const results = await spotifyAPI.search(query, types, 20);
      return results as SpotifySearchResults;
    } catch (error) {
      console.error('Search failed:', error);
      setError('Search failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Play track
  const playTrack = useCallback(async (trackUri: string) => {
    if (!isAuthenticated) return;
    
    try {
      await spotifyAPI.play(trackUri);
    } catch (error) {
      console.error('Failed to play track:', error);
      setError('Failed to play track');
    }
  }, [isAuthenticated]);

  // Play playlist
  const playPlaylist = useCallback(async (playlistUri: string) => {
    if (!isAuthenticated) return;
    
    try {
      await spotifyAPI.play(undefined, playlistUri);
    } catch (error) {
      console.error('Failed to play playlist:', error);
      setError('Failed to play playlist');
    }
  }, [isAuthenticated]);

  return {
    // State
    isAuthenticated,
    isLoading,
    user,
    playlists,
    tracks,
    albums,
    error,
    
    // Actions
    login,
    logout,
    loadPlaylists,
    loadTracks,
    loadAlbums,
    search,
    playTrack,
    playPlaylist,
    
    // Clear error
    clearError: () => setError(null),
  };
}

// PKCE helper functions
function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

function generateCodeChallenge(verifier: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(digest));
}

function base64URLEncode(array: Uint8Array): string {
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
