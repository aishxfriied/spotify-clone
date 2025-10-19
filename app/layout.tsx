import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/context/PlayerContext';
import { ThemeProvider } from '@/context/ThemeContext';
import StyledComponentsRegistry from './registry';

export const metadata: Metadata = {
  title: {
    default: 'Spotify Clone - Music for Everyone',
    template: '%s | Spotify Clone'
  },
  description: 'A modern music streaming interface built with Next.js, React, and TypeScript. Features music player, responsive design, and state management.',
  keywords: ['music', 'streaming', 'spotify', 'clone', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Aish Dhaliwal' }],
  creator: 'Aish Dhaliwal',
  publisher: 'Aish Dhaliwal',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://spotify-clone-nextjs.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://spotify-clone-nextjs.vercel.app',
    title: 'Spotify Clone - Music for Everyone',
    description: 'A modern music streaming interface built with Next.js, React, and TypeScript.',
    siteName: 'Spotify Clone',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Spotify Clone - Music for Everyone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spotify Clone - Music for Everyone',
    description: 'A modern music streaming interface built with Next.js, React, and TypeScript.',
    images: ['/og-image.png'],
    creator: '@your_twitter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1db954" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <PlayerProvider>
              {children}
            </PlayerProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
