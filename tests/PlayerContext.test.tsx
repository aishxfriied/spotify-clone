import { renderHook, act } from '@testing-library/react';
import { PlayerProvider, usePlayer } from '@/context/PlayerContext';
import { Track } from '@/types';
import { mockTracks } from '@/data/mockData';

// Mock track for testing
const mockTrack: Track = mockTracks[0];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PlayerProvider>{children}</PlayerProvider>
);

describe('PlayerContext', () => {
  it('provides initial state', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    expect(result.current.state.currentTrack).toBeNull();
    expect(result.current.state.isPlaying).toBe(false);
    expect(result.current.state.currentTime).toBe(0);
    expect(result.current.state.duration).toBe(0);
    expect(result.current.state.volume).toBe(0.5);
    expect(result.current.state.queue).toEqual([]);
    expect(result.current.state.queueIndex).toBe(0);
  });

  it('toggles play/pause correctly', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.toggle();
    });

    expect(result.current.state.isPlaying).toBe(true);

    act(() => {
      result.current.actions.toggle();
    });

    expect(result.current.state.isPlaying).toBe(false);
  });

  it('plays a track', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.play(mockTrack);
    });

    expect(result.current.state.currentTrack).toEqual(mockTrack);
    expect(result.current.state.isPlaying).toBe(true);
  });

  it('pauses playback', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.play(mockTrack);
    });

    expect(result.current.state.isPlaying).toBe(true);

    act(() => {
      result.current.actions.pause();
    });

    expect(result.current.state.isPlaying).toBe(false);
  });

  it('sets volume', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.setVolume(0.8);
    });

    expect(result.current.state.volume).toBe(0.8);
  });

  it('seeks to a specific time', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.seek(30);
    });

    expect(result.current.state.currentTime).toBe(30);
  });

  it('adds tracks to queue', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.addToQueue(mockTracks);
    });

    expect(result.current.state.queue).toEqual(mockTracks);
  });

  it('clears queue', () => {
    const { result } = renderHook(() => usePlayer(), { wrapper });

    act(() => {
      result.current.actions.addToQueue(mockTracks);
    });

    expect(result.current.state.queue).toEqual(mockTracks);

    act(() => {
      result.current.actions.clearQueue();
    });

    expect(result.current.state.queue).toEqual([]);
    expect(result.current.state.currentTrack).toBeNull();
    expect(result.current.state.isPlaying).toBe(false);
  });
});
