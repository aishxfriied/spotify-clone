'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Song } from '@/data/mockData';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  queue: Song[];
  currentIndex: number;
}

type PlayerAction =
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_SONG'; payload: Song }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_QUEUE'; payload: Song[] }
  | { type: 'NEXT_SONG' }
  | { type: 'PREV_SONG' };

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  volume: 50,
  queue: [],
  currentIndex: 0,
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
    case 'SET_SONG':
      return { 
        ...state, 
        currentSong: action.payload,
        isPlaying: true,
        currentTime: 0
      };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_QUEUE':
      return { 
        ...state, 
        queue: action.payload,
        currentIndex: 0,
        currentSong: action.payload[0] || null
      };
    case 'NEXT_SONG':
      const nextIndex = (state.currentIndex + 1) % state.queue.length;
      return {
        ...state,
        currentIndex: nextIndex,
        currentSong: state.queue[nextIndex] || null,
        currentTime: 0
      };
    case 'PREV_SONG':
      const prevIndex = state.currentIndex === 0 
        ? state.queue.length - 1 
        : state.currentIndex - 1;
      return {
        ...state,
        currentIndex: prevIndex,
        currentSong: state.queue[prevIndex] || null,
        currentTime: 0
      };
    default:
      return state;
  }
}

interface PlayerContextType {
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  nextSong: () => void;
  prevSong: () => void;
  playPlaylist: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const playSong = (song: Song) => {
    dispatch({ type: 'SET_SONG', payload: song });
  };

  const togglePlayPause = () => {
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const setCurrentTime = (time: number) => {
    dispatch({ type: 'SET_TIME', payload: time });
  };

  const nextSong = () => {
    dispatch({ type: 'NEXT_SONG' });
  };

  const prevSong = () => {
    dispatch({ type: 'PREV_SONG' });
  };

  const playPlaylist = (songs: Song[]) => {
    dispatch({ type: 'SET_QUEUE', payload: songs });
  };

  const value: PlayerContextType = {
    state,
    dispatch,
    playSong,
    togglePlayPause,
    setVolume,
    setCurrentTime,
    nextSong,
    prevSong,
    playPlaylist,
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
