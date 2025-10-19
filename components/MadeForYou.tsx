'use client';

import React from 'react';
import styled from 'styled-components';
import { madeForYou } from '@/data/mockData';

const MadeForContainer = styled.div`
  margin-bottom: 32px;
`;

const MadeForHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MadeForTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
`;

const ShowAllLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const MadeForGrid = styled.div`
  display: flex;
  gap: 16px;
`;

const MadeForItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MadeForCover = styled.div<{ gradient: string }>`
  width: 100%;
  height: 100%;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const SpotifyLogo = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: #1db954;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const gradients = [
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
];

const emojis = ['🎵', '🎶', '🎤'];

export default function MadeForYou() {
  return (
    <MadeForContainer>
      <MadeForHeader>
        <MadeForTitle>Made For Aish</MadeForTitle>
        <ShowAllLink href="#">Show all</ShowAllLink>
      </MadeForHeader>
      
      <MadeForGrid>
        {madeForYou.map((item, index) => (
          <MadeForItem key={item.id}>
            <MadeForCover gradient={gradients[index]}>
              {emojis[index]}
            </MadeForCover>
            <SpotifyLogo>♪</SpotifyLogo>
          </MadeForItem>
        ))}
      </MadeForGrid>
    </MadeForContainer>
  );
}
