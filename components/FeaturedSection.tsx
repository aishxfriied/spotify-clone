'use client';

import React from 'react';
import styled from 'styled-components';
import { featuredPlaylist } from '@/data/mockData';
import { usePlayer } from '@/context/PlayerContext';

const FeaturedContainer = styled.div`
  margin-bottom: 32px;
`;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FeaturedLabel = styled.span`
  color: #b3b3b3;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HideButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: white;
  }
`;

const FeaturedCard = styled.div`
  display: flex;
  gap: 24px;
  background: ${featuredPlaylist.gradient};
  border-radius: 12px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
`;

const FeaturedArtwork = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #dc2626, #f97316);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ViralText = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
  text-align: center;
  line-height: 1.2;
`;

const FeaturedInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FeaturedTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const FeaturedDescription = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  margin-bottom: 24px;
`;

const FeaturedActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PlayButton = styled.button`
  background-color: #1db954;
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 32px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1ed760;
    transform: scale(1.05);
  }
`;

const UnfollowButton = styled.button`
  background: none;
  border: 1px solid #b3b3b3;
  border-radius: 25px;
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: white;
    color: white;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    color: white;
  }
`;

export default function FeaturedSection() {
  const { playPlaylist } = usePlayer();

  const handlePlay = () => {
    playPlaylist(featuredPlaylist.songs);
  };

  return (
    <FeaturedContainer>
      <FeaturedHeader>
        <FeaturedLabel>Playlist</FeaturedLabel>
        <HideButton>Hide announcements</HideButton>
      </FeaturedHeader>
      
      <FeaturedCard>
        <FeaturedArtwork>
          <ViralText>the VIRAL 100</ViralText>
        </FeaturedArtwork>
        
        <FeaturedInfo>
          <FeaturedTitle>{featuredPlaylist.name}</FeaturedTitle>
          <FeaturedDescription>{featuredPlaylist.description}</FeaturedDescription>
          
          <FeaturedActions>
            <PlayButton onClick={handlePlay}>Play</PlayButton>
            <UnfollowButton>Unfollow</UnfollowButton>
            <MenuButton>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </MenuButton>
          </FeaturedActions>
        </FeaturedInfo>
      </FeaturedCard>
    </FeaturedContainer>
  );
}
