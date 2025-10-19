'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  Shuffle, 
  SkipBack, 
  Play, 
  Pause, 
  SkipForward, 
  Repeat,
  Volume2,
  List,
  Monitor,
  Mic,
  Maximize
} from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

const PlaybarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #181818;
  border-top: 1px solid #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 180px;
  min-width: 0;
`;

const SongCover = styled.div<{ gradient: string }>`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: ${props => props.gradient};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const SongInfo = styled.div`
  min-width: 0;
`;

const SongTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`;

const SongArtist = styled.div`
  font-size: 12px;
  color: #b3b3b3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 600px;
  min-width: 0;
`;

const PlaybackControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: #b3b3b3;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

const PlayPauseButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: #1ed760;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const TimeDisplay = styled.span`
  font-size: 12px;
  color: #b3b3b3;
  min-width: 40px;
  text-align: center;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #535353;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
  
  &:hover .progress-handle {
    opacity: 1;
  }
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background-color: white;
  border-radius: 2px;
  width: ${props => props.progress}%;
  transition: width 0.1s ease;
`;

const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  right: ${props => props.progress || 0}%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.2s ease;
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 180px;
  justify-content: flex-end;
  min-width: 0;
`;

const VolumeSlider = styled.input`
  width: 100px;
  height: 4px;
  background: #535353;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  &::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 2px 8px rgba(255,255,255,0.3);
  }
`;

const gradients = [
  'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
];

const emojis = ['👑', '🌌', '🍩', '🍊', '💎', '💕', '🌊', '🎤'];

export default function Playbar() {
  const { state, togglePlayPause, setVolume, setCurrentTime, nextSong, prevSong } = usePlayer();
  const [currentTime, setCurrentTimeLocal] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state.isPlaying && state.currentSong) {
      interval = setInterval(() => {
        setCurrentTimeLocal(prev => {
          const newTime = prev + 1;
          if (newTime >= state.currentSong!.duration) {
            nextSong();
            return 0;
          }
          setCurrentTime(newTime);
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [state.isPlaying, state.currentSong, nextSong, setCurrentTime]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!state.currentSong) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * state.currentSong.duration;
    
    setCurrentTimeLocal(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(event.target.value));
  };

  const progress = state.currentSong ? (currentTime / state.currentSong.duration) * 100 : 0;
  const gradientIndex = state.currentSong ? parseInt(state.currentSong.id) % gradients.length : 0;

  return (
    <PlaybarContainer>
      <LeftSection>
        {state.currentSong && (
          <>
            <SongCover gradient={gradients[gradientIndex]}>
              {emojis[gradientIndex]}
            </SongCover>
            <SongInfo>
              <SongTitle>{state.currentSong.title}</SongTitle>
              <SongArtist>{state.currentSong.artist}</SongArtist>
            </SongInfo>
          </>
        )}
      </LeftSection>
      
      <CenterSection>
        <PlaybackControls>
          <ControlButton>
            <Shuffle size={20} />
          </ControlButton>
          <ControlButton onClick={prevSong}>
            <SkipBack size={20} />
          </ControlButton>
          <PlayPauseButton onClick={togglePlayPause}>
            {state.isPlaying ? <Pause size={20} color="black" /> : <Play size={20} color="black" />}
          </PlayPauseButton>
          <ControlButton onClick={nextSong}>
            <SkipForward size={20} />
          </ControlButton>
          <ControlButton>
            <Repeat size={20} />
          </ControlButton>
        </PlaybackControls>
        
        <ProgressContainer>
          <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
          <ProgressBar onClick={handleProgressClick}>
            <ProgressFill progress={progress} />
            <ProgressHandle progress={progress} />
          </ProgressBar>
          <TimeDisplay>
            {state.currentSong ? formatTime(state.currentSong.duration) : '0:00'}
          </TimeDisplay>
        </ProgressContainer>
      </CenterSection>
      
      <RightSection>
        <ControlButton>
          <Mic size={20} />
        </ControlButton>
        <ControlButton>
          <List size={20} />
        </ControlButton>
        <ControlButton>
          <Monitor size={20} />
        </ControlButton>
        <ControlButton>
          <Volume2 size={20} />
        </ControlButton>
        <VolumeSlider
          type="range"
          min="0"
          max="100"
          value={state.volume}
          onChange={handleVolumeChange}
        />
        <ControlButton>
          <Maximize size={20} />
        </ControlButton>
      </RightSection>
    </PlaybarContainer>
  );
}
