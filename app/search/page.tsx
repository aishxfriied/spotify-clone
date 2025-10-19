'use client';

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { searchAll, mockTracks, mockAlbums, mockPlaylists, mockArtists } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';
import { formatDuration } from '@/utils/formatting';

const SearchContainer = styled.div`
  padding: 24px;
  background: #121212;
  min-height: 100vh;
  color: white;
`;

const SearchHeader = styled.div`
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 12px 16px;
  background: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #000;
  outline: none;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
`;

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0;
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

const NoResults = styled.div`
  text-align: center;
  color: #b3b3b3;
  font-size: 16px;
  padding: 40px 0;
`;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { state, actions } = usePlayer();

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return {
        tracks: { items: [], total: 0 },
        albums: { items: [], total: 0 },
        playlists: { items: [], total: 0 },
        artists: { items: [], total: 0 }
      };
    }
    return searchAll(query);
  }, [query]);

  const handleTrackClick = (track: any) => {
    actions.play(track);
  };

  const handleCardClick = (item: any, type: string) => {
    if (type === 'album') {
      window.location.href = `/album/${item.id}`;
    } else if (type === 'playlist') {
      window.location.href = `/playlist/${item.id}`;
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const hasResults = Object.values(searchResults).some(section => section.total > 0);

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchInput
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </SearchHeader>

      {!query.trim() ? (
        <div>
          <SectionTitle>Browse all</SectionTitle>
          <Grid>
            {mockPlaylists.slice(0, 6).map((playlist) => (
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
                <CardSubtitle>Playlist • {playlist.owner.display_name}</CardSubtitle>
              </Card>
            ))}
          </Grid>
        </div>
      ) : hasResults ? (
        <SearchResults>
          {searchResults.tracks.total > 0 && (
            <Section>
              <SectionTitle>Songs</SectionTitle>
              <TrackList>
                {searchResults.tracks.items.slice(0, 5).map((track) => (
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
            </Section>
          )}

          {searchResults.albums.total > 0 && (
            <Section>
              <SectionTitle>Albums</SectionTitle>
              <Grid>
                {searchResults.albums.items.slice(0, 6).map((album) => (
                  <Card
                    key={album.id}
                    onClick={() => handleCardClick(album, 'album')}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(album, 'album');
                      }
                    }}
                    aria-label={`View album ${album.name}`}
                  >
                    <CardImage image={album.images[0]?.url} />
                    <CardTitle>{album.name}</CardTitle>
                    <CardSubtitle>Album • {album.artists.map(a => a.name).join(', ')}</CardSubtitle>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {searchResults.playlists.total > 0 && (
            <Section>
              <SectionTitle>Playlists</SectionTitle>
              <Grid>
                {searchResults.playlists.items.slice(0, 6).map((playlist) => (
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
                    <CardSubtitle>Playlist • {playlist.owner.display_name}</CardSubtitle>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}

          {searchResults.artists.total > 0 && (
            <Section>
              <SectionTitle>Artists</SectionTitle>
              <Grid>
                {searchResults.artists.items.slice(0, 6).map((artist) => (
                  <Card
                    key={artist.id}
                    tabIndex={0}
                    aria-label={`View artist ${artist.name}`}
                  >
                    <CardImage image={artist.images[0]?.url} />
                    <CardTitle>{artist.name}</CardTitle>
                    <CardSubtitle>Artist</CardSubtitle>
                  </Card>
                ))}
              </Grid>
            </Section>
          )}
        </SearchResults>
      ) : (
        <NoResults>
          No results found for "{query}"
        </NoResults>
      )}
    </SearchContainer>
  );
}

