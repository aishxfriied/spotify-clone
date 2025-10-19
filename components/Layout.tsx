'use client';

import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import Playbar from './Playbar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #000;
  color: white;
  overflow: hidden;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  padding-top: 80px;
  padding-bottom: 80px;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
`;

const MainSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const RightSidebar = styled.div`
  width: 300px;
  min-width: 250px;
  background-color: #121212;
  border-radius: 8px;
  padding: 24px;
  flex-shrink: 0;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Header />
      <Sidebar />
      <MainContent>
        <ContentArea>
          <MainSection>
            {children}
          </MainSection>
          <RightSidebar>
            {/* Right sidebar content will be added here */}
          </RightSidebar>
        </ContentArea>
      </MainContent>
      <Playbar />
    </LayoutContainer>
  );
}
