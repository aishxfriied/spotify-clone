'use client';

import React from 'react';
import styled from 'styled-components';
import { Playlist } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';

interface PlaylistItemContainerProps {
  isActive?: boolean;
}

const PlaylistItemContainer = styled.li<PlaylistItemContainerProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin: 2px 0;
  transition: all 0.2s ease;
  background-color: ${(props: PlaylistItemContainerProps) => props.isActive ? '#1db954' : 'transparent'};
  
  &:hover {
    background-color: ${(props: PlaylistItemContainerProps) => props.isActive ? '#1db954' : '#333'};
    transform: translateX(4px);
  }
`;

interface CoverImageProps {
  gradient: string;
}

const CoverImage = styled.div<CoverImageProps>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background: ${(props: CoverImageProps) => props.gradient};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const PlaylistInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

interface PlaylistNameProps {
  isActive?: boolean;
}

const PlaylistName = styled.div<PlaylistNameProps>`
  font-size: 14px;
  font-weight: ${(props: PlaylistNameProps) => props.isActive ? '600' : '500'};
  color: ${(props: PlaylistNameProps) => props.isActive ? 'white' : 'white'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface PlaylistTypeProps {
  isActive?: boolean;
}

const PlaylistType = styled.div<PlaylistTypeProps>`
  font-size: 12px;
  color: ${(props: PlaylistTypeProps) => props.isActive ? 'rgba(255,255,255,0.8)' : '#b3b3b3'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayingIndicator = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-left: auto;
`;

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

const emojis = ['💀', '🎵', '🎶', '❤️', '🌌', '🍩', '🍊', '💎', '👑', '🎤', '🌊'];

interface PlaylistItemProps {
  playlist: Playlist;
}

export default function PlaylistItem({ playlist }: PlaylistItemProps) {
  const { state, playPlaylist } = usePlayer();
  const isActive = state.currentSong?.id === playlist.songs[0]?.id;
  const gradientIndex = parseInt(playlist.id) % gradients.length;
  
  const handleClick = () => {
    playPlaylist(playlist.songs);
  };

  return (
    <PlaylistItemContainer isActive={isActive} onClick={handleClick}>
      <CoverImage gradient={gradients[gradientIndex]}>
        {emojis[gradientIndex]}
      </CoverImage>
      <PlaylistInfo>
        <PlaylistName isActive={isActive}>
          {playlist.name}
        </PlaylistName>
        <PlaylistType isActive={isActive}>
          {playlist.type === 'playlist' 
            ? `Playlist • ${playlist.owner}` 
            : `Album • ${playlist.owner}`
          }
          {playlist.songCount && ` • ${playlist.songCount} songs`}
        </PlaylistType>
      </PlaylistInfo>
      {isActive && <PlayingIndicator>♪</PlayingIndicator>}
    </PlaylistItemContainer>
  );
}
