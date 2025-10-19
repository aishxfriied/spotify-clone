'use client';

import React from 'react';
import styled from 'styled-components';
import { PlayerProvider } from '@/context/PlayerContext';
import Layout from '@/components/Layout';
import FeaturedSection from '@/components/FeaturedSection';
import ContentGrid from '@/components/ContentGrid';
import MadeForYou from '@/components/MadeForYou';

const PageContainer = styled.div`
  padding: 16px;
  height: 100%;
  overflow-y: auto;
`;

export default function HomePage() {
  return (
    <PlayerProvider>
      <Layout>
        <PageContainer>
          <FeaturedSection />
          <ContentGrid />
          <MadeForYou />
        </PageContainer>
      </Layout>
    </PlayerProvider>
  );
}
