'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Home, Search, Music, ChevronDown, User } from 'lucide-react';
import { mockPlaylists } from '@/data/mockData';
import PlaylistItem from './PlaylistItem';

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 80px;
  bottom: 80px;
  width: 240px;
  background-color: #000;
  padding: 10px;
  overflow-y: auto;
  z-index: 1000;
`;

const Logo = styled.div`
  padding: 20px 0;
  margin-bottom: 20px;
`;

const LogoImage = styled.img`
  width: 110px;
  filter: invert(1);
`;

const Navigation = styled.nav`
  margin-bottom: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 0;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: ${props => props.active ? 'white' : '#b3b3b3'};
  
  &:hover {
    color: white;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const LibrarySection = styled.div`
  background-color: #121212;
  border-radius: 7px;
  padding: 10px;
  min-height: calc(100vh - 200px);
  position: relative;
`;

const LibraryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 23px 14px;
  font-weight: bold;
  font-size: 13px;
`;

const LibraryTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const LibraryActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: white;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 14px 16px;
  flex-wrap: wrap;
`;

const TabButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#333' : 'none'};
  border: none;
  color: ${props => props.active ? 'white' : '#b3b3b3'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #444;
    color: white;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #333;
  border-radius: 20px;
  padding: 8px 12px;
  margin: 0 14px 16px;
  gap: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 14px;
  
  &::placeholder {
    color: #b3b3b3;
  }
`;

const RecentsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px 8px;
  color: #b3b3b3;
  font-size: 12px;
  font-weight: 500;
`;

const PlaylistList = styled.ul`
  list-style: none;
  padding: 0 12px;
  margin: 0;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  font-size: 10px;
  color: #b3b3b3;
  gap: 13px;
  padding: 10px 14px;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: #b3b3b3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <SidebarContainer>
      <Logo>
        <LogoImage src="/img/logo.svg" alt="Spotify" />
      </Logo>
      
      <Navigation>
        <NavList>
          <NavItem active={pathname === '/'}>
            <NavLink href="/">
              <Home size={24} />
              Home
            </NavLink>
          </NavItem>
          <NavItem active={pathname === '/search'}>
            <NavLink href="/search">
              <Search size={24} />
              Search
            </NavLink>
          </NavItem>
          <NavItem active={pathname === '/profile'}>
            <NavLink href="/profile">
              <User size={24} />
              Profile
            </NavLink>
          </NavItem>
        </NavList>
      </Navigation>
      
      <LibrarySection>
        <LibraryHeader>
          <LibraryTitle>
            <Music size={30} />
            <h2>Your Library</h2>
          </LibraryTitle>
          <LibraryActions>
            <ExpandButton>
              <ChevronDown size={20} />
            </ExpandButton>
          </LibraryActions>
        </LibraryHeader>
        
        <TabsContainer>
          <TabButton active>Playlists</TabButton>
          <TabButton>Podcasts</TabButton>
          <TabButton>Albums</TabButton>
          <TabButton>Artists</TabButton>
          <TabButton>Events</TabButton>
        </TabsContainer>
        
        <SearchContainer>
          <Search size={16} color="#b3b3b3" />
          <SearchInput placeholder="Search in Your Library" />
        </SearchContainer>
        
        <RecentsHeader>
          <span>Recents</span>
          <ChevronDown size={16} />
        </RecentsHeader>
        
        <PlaylistList>
          {mockPlaylists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
        </PlaylistList>
        
        <Footer>
          <FooterLink href="#">Legal</FooterLink>
          <FooterLink href="#">Privacy Center</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Cookies</FooterLink>
          <FooterLink href="#">About Ads</FooterLink>
          <FooterLink href="#">Accessibility</FooterLink>
        </Footer>
      </LibrarySection>
    </SidebarContainer>
  );
}
