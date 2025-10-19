'use client';

import React from 'react';
import styled from 'styled-components';
import { Search, Bell, Users, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1001;
  box-sizing: border-box;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: #333;
  }
`;

const NavArrows = styled.div`
  display: flex;
  gap: 8px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    color: white;
    background-color: #333;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding: 8px 16px;
  gap: 12px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: black;
  font-size: 14px;
  
  &::placeholder {
    color: #666;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    background-color: #333;
  }

  &:focus {
    outline: 2px solid #1db954;
    outline-offset: 2px;
  }
`;

const ThemeToggle = styled(IconButton)`
  color: ${props => props.theme?.colors?.accent || '#1db954'};
`;

const ProfilePic = styled.div`
  width: 32px;
  height: 32px;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #444;
  }
`;

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <NavSection>
        <HamburgerButton aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </HamburgerButton>
        <NavArrows>
          <ArrowButton aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9.70711 11.2929C9.37377 11.6262 9.20711 11.7929 9.20711 12C9.20711 12.2071 9.37377 12.3738 9.70711 12.7071L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ArrowButton>
          <ArrowButton aria-label="Go forward">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L14.2929 12.7071C14.6262 12.3738 14.7929 12.2071 14.7929 12C14.7929 11.7929 14.6262 11.6262 14.2929 11.2929L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ArrowButton>
        </NavArrows>
      </NavSection>
      
      <SearchContainer>
        <SearchBar>
          <Search size={20} color="#666" />
          <SearchInput 
            placeholder="What do you want to play?" 
            aria-label="Search for music"
          />
        </SearchBar>
      </SearchContainer>
      
      <HeaderRight>
        <HeaderIcons>
          <ThemeToggle 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </ThemeToggle>
          <IconButton aria-label="Notifications">
            <Bell size={24} />
          </IconButton>
          <IconButton aria-label="Friends">
            <Users size={24} />
          </IconButton>
        </HeaderIcons>
        <ProfilePic aria-label="Profile">
          <User size={20} />
        </ProfilePic>
      </HeaderRight>
    </HeaderContainer>
  );
}
