'use client';

import React, { createContext, useContext, useReducer, useEffect, useRef, useCallback } from 'react';
import { Track, PlayerState, PlayerActions } from '@/types';

type PlayerAction =
  | { type: 'PLAY_TRACK'; payload: Track }
  | { type: 'TOGGLE_PLAY_PAUSE' }
  | { type: 'PAUSE' }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Track[] }
  | { type: 'CLEAR_QUEUE' }
  | { type: 'SET_QUEUE_INDEX'; payload: number }
  | { type: 'SET_REPEAT'; payload: PlayerState['repeat'] }
  | { type: 'SET_SHUFFLE'; payload: boolean };

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.5,
  queue: [],
  queueIndex: 0,
  repeat: 'off',
  shuffle: false,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
        isPlaying: true,
        queueIndex: state.queue.findIndex(track => track.id === action.payload.id),
      };
    case 'TOGGLE_PLAY_PAUSE':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case 'PAUSE':
      return {
        ...state,
        isPlaying: false,
      };
    case 'NEXT_TRACK':
      const nextIndex = state.queueIndex < state.queue.length - 1 ? state.queueIndex + 1 : 0;
      return {
        ...state,
        currentTrack: state.queue[nextIndex] || null,
        queueIndex: nextIndex,
        isPlaying: state.queue[nextIndex] ? true : false,
      };
    case 'PREV_TRACK':
      const prevIndex = state.queueIndex > 0 ? state.queueIndex - 1 : state.queue.length - 1;
      return {
        ...state,
        currentTrack: state.queue[prevIndex] || null,
        queueIndex: prevIndex,
        isPlaying: state.queue[prevIndex] ? true : false,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, ...action.payload],
      };
    case 'CLEAR_QUEUE':
      return {
        ...state,
        queue: [],
        queueIndex: 0,
        currentTrack: null,
        isPlaying: false,
      };
    case 'SET_QUEUE_INDEX':
      return {
        ...state,
        queueIndex: action.payload,
        currentTrack: state.queue[action.payload] || null,
      };
    case 'SET_REPEAT':
      return {
        ...state,
        repeat: action.payload,
      };
    case 'SET_SHUFFLE':
      return {
        ...state,
        shuffle: action.payload,
      };
    default:
      return state;
  }
}

interface PlayerContextType {
  state: PlayerState;
  actions: PlayerActions;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
    }
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          dispatch({ type: 'TOGGLE_PLAY_PAUSE' });
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (audioRef.current) {
            const newTime = Math.max(0, audioRef.current.currentTime - 5);
            audioRef.current.currentTime = newTime;
            dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
          }
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (audioRef.current) {
            const newTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
            audioRef.current.currentTime = newTime;
            dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          const volumeUp = Math.min(1, state.volume + 0.1);
          dispatch({ type: 'SET_VOLUME', payload: volumeUp });
          break;
        case 'ArrowDown':
          event.preventDefault();
          const volumeDown = Math.max(0, state.volume - 0.1);
          dispatch({ type: 'SET_VOLUME', payload: volumeDown });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.volume]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      dispatch({ type: 'SET_CURRENT_TIME', payload: audio.currentTime });
    };

    const handleDurationChange = () => {
      dispatch({ type: 'SET_DURATION', payload: audio.duration });
    };

    const handleEnded = () => {
      if (state.repeat === 'track') {
        audio.currentTime = 0;
        audio.play();
      } else {
        dispatch({ type: 'NEXT_TRACK' });
      }
    };

    const handleError = () => {
      console.error('Audio playback error');
      dispatch({ type: 'PAUSE' });
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [state.repeat]);

  // Handle play/pause state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;

    if (state.isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [state.isPlaying, state.currentTrack]);

  // Handle volume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = state.volume;
  }, [state.volume]);

  // Handle current track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;

    // For demo purposes, we'll use a placeholder audio source
    // In a real app, you'd use the actual audio URL from state.currentTrack.preview_url
    audio.src = '/audio/placeholder.mp3';
    audio.load();
  }, [state.currentTrack]);

  const actions: PlayerActions = {
    play: useCallback((track: Track) => {
      dispatch({ type: 'PLAY_TRACK', payload: track });
    }, []),
    pause: useCallback(() => {
      dispatch({ type: 'PAUSE' });
    }, []),
    toggle: useCallback(() => {
      dispatch({ type: 'TOGGLE_PLAY_PAUSE' });
    }, []),
    next: useCallback(() => {
      dispatch({ type: 'NEXT_TRACK' });
    }, []),
    prev: useCallback(() => {
      dispatch({ type: 'PREV_TRACK' });
    }, []),
    seek: useCallback((time: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = time;
      dispatch({ type: 'SET_CURRENT_TIME', payload: time });
    }, []),
    setVolume: useCallback((volume: number) => {
      dispatch({ type: 'SET_VOLUME', payload: volume });
    }, []),
    addToQueue: useCallback((tracks: Track[]) => {
      dispatch({ type: 'ADD_TO_QUEUE', payload: tracks });
    }, []),
    clearQueue: useCallback(() => {
      dispatch({ type: 'CLEAR_QUEUE' });
    }, []),
    setRepeat: useCallback((repeat: PlayerState['repeat']) => {
      dispatch({ type: 'SET_REPEAT', payload: repeat });
    }, []),
    setShuffle: useCallback((shuffle: boolean) => {
      dispatch({ type: 'SET_SHUFFLE', payload: shuffle });
    }, []),
  };

  const value: PlayerContextType = {
    state,
    actions,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}