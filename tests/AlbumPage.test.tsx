import { render, screen } from '@testing-library/react';
import AlbumPage from '@/app/album/[id]/page';

// Mock Next.js useParams
jest.mock('next/navigation', () => ({
  useParams: () => ({ id: 'album-1' }),
}));

// Mock the data
jest.mock('@/data/mockData', () => ({
  getAlbumById: jest.fn((id: string) => ({
    id: 'album-1',
    name: 'Test Album',
    artists: [{ name: 'Test Artist' }],
    images: [{ url: '/test-image.jpg' }],
    release_date: '2023-01-01',
    total_tracks: 10,
    album_type: 'album',
    popularity: 80,
    external_urls: { spotify: 'https://spotify.com/album/1' },
  })),
  mockTracks: [
    {
      id: 'track-1',
      name: 'Test Track',
      artists: [{ name: 'Test Artist' }],
      album: { name: 'Test Album' },
      duration_ms: 180000,
      preview_url: null,
      track_number: 1,
      disc_number: 1,
      explicit: false,
      popularity: 80,
      external_urls: { spotify: 'https://spotify.com/track/1' },
    },
  ],
}));

// Mock the PlayerContext
jest.mock('@/context/PlayerContext', () => ({
  usePlayer: () => ({
    state: {
      currentTrack: null,
      isPlaying: false,
    },
    actions: {
      addToQueue: jest.fn(),
      play: jest.fn(),
    },
  }),
}));

describe('AlbumPage', () => {
  it('renders album information', () => {
    render(<AlbumPage />);
    
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Album')).toBeInTheDocument();
  });

  it('renders track list', () => {
    render(<AlbumPage />);
    
    expect(screen.getByText('Test Track')).toBeInTheDocument();
  });

  it('has play button', () => {
    render(<AlbumPage />);
    
    expect(screen.getByRole('button', { name: /play album/i })).toBeInTheDocument();
  });

  it('displays album stats', () => {
    render(<AlbumPage />);
    
    expect(screen.getByText('10 songs')).toBeInTheDocument();
  });
});
