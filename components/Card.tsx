'use client';

import React from 'react';
import styled from 'styled-components';
import { Song } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #181818;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: #282828;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const CoverImage = styled.div<{ gradient: string }>`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const PlayButton = styled.div`
  position: absolute;
  bottom: 88px;
  right: 17px;
  width: 28px;
  height: 28px;
  background-color: #1fdf64;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 1s ease-out;
  cursor: pointer;
  
  ${CardContainer}:hover & {
    opacity: 1;
  }
  
  &:hover {
    transform: scale(1.1);
  }
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
];

const emojis = ['🌌', '🍩', '🍊', '💎', '💕', '🌊', '🎤', '🌌'];

interface CardProps {
  song: Song;
  onClick?: () => void;
}

export default function Card({ song, onClick }: CardProps) {
  const { playSong } = usePlayer();
  const gradientIndex = parseInt(song.id) % gradients.length;

  const handleClick = () => {
    playSong(song);
    onClick?.();
  };

  return (
    <CardContainer onClick={handleClick}>
      <CoverImage gradient={gradients[gradientIndex]}>
        {emojis[gradientIndex]}
      </CoverImage>
      <CardTitle>{song.title}</CardTitle>
      <PlayButton>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </PlayButton>
    </CardContainer>
  );
}
