import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

// Mock the components
jest.mock('@/components/Layout', () => {
  return function MockLayout({ children }: { children: React.ReactNode }) {
    return <div data-testid="layout">{children}</div>;
  };
});

jest.mock('@/components/FeaturedSection', () => {
  return function MockFeaturedSection() {
    return <div data-testid="featured-section">Featured Section</div>;
  };
});

jest.mock('@/components/ContentGrid', () => {
  return function MockContentGrid() {
    return <div data-testid="content-grid">Content Grid</div>;
  };
});

jest.mock('@/components/MadeForYou', () => {
  return function MockMadeForYou() {
    return <div data-testid="made-for-you">Made For You</div>;
  };
});

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('featured-section')).toBeInTheDocument();
    expect(screen.getByTestId('content-grid')).toBeInTheDocument();
    expect(screen.getByTestId('made-for-you')).toBeInTheDocument();
  });

  it('shows key sections', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Featured Section')).toBeInTheDocument();
    expect(screen.getByText('Content Grid')).toBeInTheDocument();
    expect(screen.getByText('Made For You')).toBeInTheDocument();
  });
});
