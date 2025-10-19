# 🎵 Spotify Clone - Next.js & React

A modern Spotify web player clone built with Next.js 14, React 18, TypeScript, and Styled Components.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://spotify-clone-nextjs.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-View%20Code-black?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME/spotify-clone)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## ✨ Features

- 🎵 **Music Player**: Play/pause, skip tracks, volume control
- 🎨 **Modern UI**: Responsive design with smooth animations
- 🔄 **State Management**: React Context for global state
- 📱 **Mobile Responsive**: Works on all screen sizes
- ⚡ **Fast Performance**: Next.js optimization and code splitting
- 🎯 **TypeScript**: Full type safety throughout the application
- 🚀 **Deployed**: Live on Vercel and GitHub Pages

## 🚀 Live Demo

- **Vercel:** [spotify-clone-nextjs.vercel.app](https://spotify-clone-nextjs.vercel.app)
- **GitHub Pages:** [your-username.github.io/spotify-clone](https://your-username.github.io/spotify-clone)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Styled Components
- **Icons**: Lucide React
- **State Management**: React Context + useReducer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
spotify-clone/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Card.tsx          # Reusable card component
│   ├── Header.tsx        # Top navigation header
│   ├── Layout.tsx        # Main layout wrapper
│   ├── Playbar.tsx       # Bottom music player
│   ├── PlaylistItem.tsx  # Sidebar playlist items
│   └── Sidebar.tsx       # Left navigation sidebar
├── context/              # React Context
│   └── PlayerContext.tsx # Music player state management
├── data/                 # Mock data
│   └── mockData.ts       # Songs, playlists, and other data
├── img/                  # Static images
└── public/               # Public assets
```

## Components

### Reusable Components

- **Card**: Displays song/album information with hover effects
- **Header**: Fixed top navigation with search bar
- **Sidebar**: Left navigation with playlists and library
- **Playbar**: Bottom music player with controls
- **PlaylistItem**: Individual playlist/album items

### State Management

The app uses React Context for global state management:

- **PlayerContext**: Manages music player state (current song, playing status, volume, etc.)
- **usePlayer**: Custom hook for accessing player state and actions

## Features in Detail

### Music Player
- Play/pause functionality
- Track switching
- Volume control
- Progress bar with seeking
- Keyboard shortcuts (Space, Arrow keys)

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Adaptive grid layouts
- Touch-friendly controls

### Performance
- Next.js optimization
- Code splitting
- Image optimization
- Efficient re-renders

## Customization

### Adding New Songs
Edit `data/mockData.ts` to add new songs or playlists:

```typescript
export const mockSongs: Song[] = [
  {
    id: 'new-song',
    title: 'New Song Title',
    artist: 'Artist Name',
    album: 'Album Name',
    duration: 240, // in seconds
    cover: '/img/cover.jpg',
  },
  // ... more songs
];
```

### Styling
The app uses Styled Components for styling. Each component has its own styles defined inline.

### Adding Spotify API
To integrate with the real Spotify API:

1. Set up Spotify Developer account
2. Get API credentials
3. Replace mock data with API calls
4. Add authentication flow

## 🚀 Deployment

### Option 1: Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/spotify-clone)

**Manual Deploy:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

### Option 2: GitHub Pages

**Automatic Deploy:**
1. Push to `main` branch
2. GitHub Actions will automatically deploy
3. Enable GitHub Pages in repository settings
4. Select "GitHub Actions" as source

### Option 3: Netlify

**One-Click Deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/spotify-clone)

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static files for deployment
- `./deploy.sh` - Run deployment script

## 📁 Additional Files

- `vercel.json` - Vercel deployment configuration
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `deploy.sh` - Deployment script
- `DEPLOYMENT.md` - Detailed deployment guide
- `GITHUB_SETUP.md` - GitHub repository setup guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspired by Spotify
- Icons from various sources
- Built with modern web technologies
- Community feedback and contributions

---

⭐ **Star this repository if you found it helpful!**
