'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { mockSongs } from '@/data/mockData';
import Card from './Card';

const ContentContainer = styled.div`
  margin-bottom: 32px;
`;

const ContentTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'white' : 'none'};
  border: none;
  color: ${props => props.active ? 'black' : '#b3b3b3'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'white' : '#444'};
    color: white;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  max-width: 100%;
  width: 100%;
`;

const tabs = ['All', 'Music', 'Podcasts', 'Audiobooks'];

export default function ContentGridComponent() {
  const [activeTab, setActiveTab] = useState('All');

  // Filter songs based on active tab
  const filteredSongs = mockSongs.filter(song => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Music') return true; // All our mock songs are music
    return false;
  });

  return (
    <ContentContainer>
      <ContentTabs>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </TabButton>
        ))}
      </ContentTabs>
      
      <ContentGrid>
        {filteredSongs.map(song => (
          <Card key={song.id} song={song} />
        ))}
      </ContentGrid>
    </ContentContainer>
  );
}
