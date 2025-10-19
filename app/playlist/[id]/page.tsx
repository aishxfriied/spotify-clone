'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { getPlaylistById, mockTracks } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';
import { formatDuration, formatNumber } from '@/utils/formatting';

const PlaylistContainer = styled.div`
  padding: 24px;
  background: linear-gradient(180deg, #1a1a1a 0%, #121212 100%);
  min-height: 100vh;
  color: white;
`;

const PlaylistHeader = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const PlaylistCover = styled.div<{ image: string }>`
  width: 232px;
  height: 232px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #450a0a, #7c2d12)'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
`;

const PlaylistInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 16px;
`;

const PlaylistType = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PlaylistTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  color: white;
`;

const PlaylistDescription = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  line-height: 1.5;
  max-width: 600px;
`;

const PlaylistStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #b3b3b3;
`;

const PlaylistOwner = styled.div`
  font-size: 14px;
  color: white;
  font-weight: 400;
`;

const PlayButton = styled.button`
  background: #1db954;
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  font-size: 14px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 16px;
  width: fit-content;

  &:hover {
    background: #1ed760;
    transform: scale(1.05);
  }

  &:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
`;

const TracksList = styled.div`
  margin-top: 32px;
`;

const TrackItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isActive ? 'rgba(29, 185, 84, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TrackNumber = styled.div`
  width: 24px;
  text-align: center;
  font-size: 14px;
  color: #b3b3b3;
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtists = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackDuration = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  min-width: 40px;
  text-align: right;
`;

const PlayIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1db954;
  font-size: 16px;
`;

export default function PlaylistPage() {
  const params = useParams();
  const playlistId = params.id as string;
  const playlist = getPlaylistById(playlistId);
  const { state, actions } = usePlayer();

  if (!playlist) {
    return (
      <PlaylistContainer>
        <div>Playlist not found</div>
      </PlaylistContainer>
    );
  }

  // For demo purposes, we'll use mock tracks
  const playlistTracks = mockTracks.slice(0, 12);

  const handlePlayPlaylist = () => {
    actions.addToQueue(playlistTracks);
    if (playlistTracks.length > 0) {
      actions.play(playlistTracks[0]);
    }
  };

  const handleTrackClick = (track: any) => {
    actions.play(track);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PlaylistContainer>
      <PlaylistHeader>
        <PlaylistCover image={playlist.images[0]?.url} />
        <PlaylistInfo>
          <PlaylistType>Playlist</PlaylistType>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <PlaylistDescription>{playlist.description}</PlaylistDescription>
          <PlaylistOwner>
            By {playlist.owner.display_name}
          </PlaylistOwner>
          <PlaylistStats>
            <span>{playlist.tracks.total} songs</span>
            <span>•</span>
            <span>{formatDuration(playlistTracks.reduce((total, track) => total + track.duration_ms, 0))}</span>
          </PlaylistStats>
          <PlayButton onClick={handlePlayPlaylist} aria-label="Play playlist">
            ▶ Play
          </PlayButton>
        </PlaylistInfo>
      </PlaylistHeader>

      <TracksList>
        {playlistTracks.map((track, index) => (
          <TrackItem
            key={track.id}
            isActive={state.currentTrack?.id === track.id}
            onClick={() => handleTrackClick(track)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTrackClick(track);
              }
            }}
            aria-label={`Play ${track.name} by ${track.artists.map(a => a.name).join(', ')}`}
          >
            <TrackNumber>
              {state.currentTrack?.id === track.id && state.isPlaying ? (
                <PlayIcon>♪</PlayIcon>
              ) : (
                index + 1
              )}
            </TrackNumber>
            <TrackInfo>
              <TrackName>{track.name}</TrackName>
              <TrackArtists>{track.artists.map(artist => artist.name).join(', ')}</TrackArtists>
            </TrackInfo>
            <TrackDuration>{formatTime(track.duration_ms)}</TrackDuration>
          </TrackItem>
        ))}
      </TracksList>
    </PlaylistContainer>
  );
}

