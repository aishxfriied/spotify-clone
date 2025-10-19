'use client';

import React from 'react';
import styled from 'styled-components';
import { mockUser, mockTracks, mockPlaylists } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';
import { formatNumber } from '@/utils/formatting';

const ProfileContainer = styled.div`
  padding: 24px;
  background: linear-gradient(180deg, #1a1a1a 0%, #121212 100%);
  min-height: 100vh;
  color: white;
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const ProfileImage = styled.div<{ image: string }>`
  width: 120px;
  height: 120px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #450a0a, #7c2d12)'};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const ProfileName = styled.h1`
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  margin: 0;
  color: white;
`;

const ProfileStats = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #b3b3b3;
`;

const ProfileCountry = styled.div`
  font-size: 14px;
  color: #b3b3b3;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background: #181818;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #282828;
  }

  &:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
`;

const CardImage = styled.div<{ image: string }>`
  width: 100%;
  aspect-ratio: 1;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #450a0a, #7c2d12)'};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const CardSubtitle = styled.div`
  font-size: 14px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TrackItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isActive ? 'rgba(29, 185, 84, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TrackImage = styled.div<{ image: string }>`
  width: 40px;
  height: 40px;
  background: ${props => props.image ? `url(${props.image})` : 'linear-gradient(135deg, #450a0a, #7c2d12)'};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  flex-shrink: 0;
`;

const TrackInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const TrackName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtists = styled.div`
  font-size: 12px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackDuration = styled.div`
  font-size: 12px;
  color: #b3b3b3;
  min-width: 40px;
  text-align: right;
`;

const PlayIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1db954;
  font-size: 14px;
`;

const PlayButton = styled.button`
  background: #1db954;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
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

export default function ProfilePage() {
  const { state, actions } = usePlayer();

  // Recently played tracks (mock data)
  const recentlyPlayed = mockTracks.slice(0, 8);

  // User's playlists
  const userPlaylists = mockPlaylists.filter(playlist => playlist.owner.id === mockUser.id);

  const handleTrackClick = (track: any) => {
    actions.play(track);
  };

  const handleCardClick = (item: any, type: string) => {
    if (type === 'playlist') {
      window.location.href = `/playlist/${item.id}`;
    }
  };

  const handlePlayRecentlyPlayed = () => {
    actions.addToQueue(recentlyPlayed);
    if (recentlyPlayed.length > 0) {
      actions.play(recentlyPlayed[0]);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage image={mockUser.images[0]?.url} />
        <ProfileInfo>
          <ProfileName>{mockUser.display_name}</ProfileName>
          <ProfileStats>
            <span>{formatNumber(mockUser.followers.total)} followers</span>
            <span>•</span>
            <span>{userPlaylists.length} playlists</span>
          </ProfileStats>
          <ProfileCountry>{mockUser.country}</ProfileCountry>
        </ProfileInfo>
      </ProfileHeader>

      <Section>
        <SectionTitle>Recently Played</SectionTitle>
        <TrackList>
          {recentlyPlayed.map((track) => (
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
              <TrackImage image={track.album.images[0]?.url} />
              <TrackInfo>
                <TrackName>{track.name}</TrackName>
                <TrackArtists>{track.artists.map(artist => artist.name).join(', ')}</TrackArtists>
              </TrackInfo>
              <TrackDuration>{formatTime(track.duration_ms)}</TrackDuration>
              {state.currentTrack?.id === track.id && state.isPlaying && (
                <PlayIcon>♪</PlayIcon>
              )}
            </TrackItem>
          ))}
        </TrackList>
        <PlayButton onClick={handlePlayRecentlyPlayed} aria-label="Play recently played">
          ▶ Play Recently Played
        </PlayButton>
      </Section>

      <Section>
        <SectionTitle>Your Playlists</SectionTitle>
        <Grid>
          {userPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              onClick={() => handleCardClick(playlist, 'playlist')}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(playlist, 'playlist');
                }
              }}
              aria-label={`View playlist ${playlist.name}`}
            >
              <CardImage image={playlist.images[0]?.url} />
              <CardTitle>{playlist.name}</CardTitle>
              <CardSubtitle>{playlist.tracks.total} songs</CardSubtitle>
            </Card>
          ))}
        </Grid>
      </Section>
    </ProfileContainer>
  );
}

