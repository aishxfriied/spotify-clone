# Spotify Web API Integration

This branch contains the foundation for integrating with the Spotify Web API using OAuth 2.0 with PKCE (Proof Key for Code Exchange).

## Overview

The Spotify Web API integration allows users to:
- Authenticate with their Spotify accounts
- Access their personal playlists, albums, and tracks
- Play music from their Spotify library
- Search Spotify's music catalog
- Access user profile information

## Setup Instructions

### 1. Spotify Developer Account

1. Go to [Spotify for Developers](https://developer.spotify.com/)
2. Log in with your Spotify account
3. Create a new app
4. Note down your `Client ID` and `Client Secret`

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
# Spotify Web API Credentials
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify

# Optional: For production
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI_PROD=https://your-domain.com/api/auth/callback/spotify
```

### 3. App Settings

In your Spotify app settings:
- Add `http://localhost:3000/api/auth/callback/spotify` to Redirect URIs
- Add `https://your-domain.com/api/auth/callback/spotify` for production
- Request the following scopes:
  - `user-read-private`
  - `user-read-email`
  - `playlist-read-private`
  - `playlist-read-collaborative`
  - `user-library-read`
  - `user-top-read`
  - `user-read-recently-played`
  - `user-read-playback-state`
  - `user-modify-playback-state`
  - `user-read-currently-playing`

## Implementation Details

### OAuth PKCE Flow

The authentication follows the OAuth 2.0 Authorization Code flow with PKCE:

1. **Authorization Request**: User clicks "Login with Spotify"
2. **Code Challenge**: Generate code verifier and challenge
3. **Redirect**: User is redirected to Spotify authorization
4. **Authorization Code**: Spotify redirects back with authorization code
5. **Token Exchange**: Exchange code for access and refresh tokens
6. **API Access**: Use access token for API calls

### Key Files

```
lib/
├── spotify.ts          # Spotify API client
├── auth.ts             # OAuth PKCE implementation
└── types.ts            # Spotify API types

hooks/
├── useSpotify.ts       # Main Spotify hook
├── useAuth.ts          # Authentication hook
└── usePlayback.ts      # Playback control hook

api/
├── auth/
│   ├── login/route.ts  # Initiate OAuth flow
│   └── callback/route.ts # Handle OAuth callback
└── spotify/
    ├── me/route.ts     # Get user profile
    ├── playlists/route.ts # Get user playlists
    └── search/route.ts # Search music
```

### Usage Example

```typescript
import { useSpotify } from '@/hooks/useSpotify';

function MyComponent() {
  const { 
    isAuthenticated, 
    user, 
    playlists, 
    searchTracks,
    playTrack 
  } = useSpotify();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div>
      <h1>Welcome, {user?.display_name}!</h1>
      <PlaylistList playlists={playlists} />
    </div>
  );
}
```

## API Endpoints

### Authentication
- `GET /api/auth/login` - Initiate OAuth flow
- `GET /api/auth/callback/spotify` - Handle OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Clear session

### Spotify Data
- `GET /api/spotify/me` - Get user profile
- `GET /api/spotify/playlists` - Get user playlists
- `GET /api/spotify/albums` - Get user albums
- `GET /api/spotify/tracks` - Get user saved tracks
- `GET /api/spotify/search?q=query` - Search music
- `GET /api/spotify/playback/state` - Get current playback state
- `POST /api/spotify/playback/play` - Start playback
- `POST /api/spotify/playback/pause` - Pause playback

## Security Considerations

### 1. Token Storage
- Access tokens stored in HTTP-only cookies
- Refresh tokens encrypted and stored securely
- Automatic token refresh before expiration

### 2. CORS Configuration
- Proper CORS headers for API routes
- Origin validation for production
- Secure cookie settings

### 3. Rate Limiting
- Implement rate limiting for API calls
- Respect Spotify's rate limits
- Exponential backoff for failed requests

## Error Handling

### 1. Authentication Errors
- Handle expired tokens gracefully
- Redirect to login on authentication failure
- Clear invalid session data

### 2. API Errors
- Retry failed requests with exponential backoff
- Show user-friendly error messages
- Log errors for debugging

### 3. Network Errors
- Handle offline scenarios
- Show appropriate fallback content
- Queue actions for when connection is restored

## Testing

### 1. Unit Tests
- Mock Spotify API responses
- Test authentication flow
- Test error handling

### 2. Integration Tests
- Test API endpoint functionality
- Test token refresh mechanism
- Test user flows

### 3. E2E Tests
- Test complete authentication flow
- Test music playback
- Test search functionality

## Deployment

### 1. Environment Variables
- Set production environment variables
- Use secure secret management
- Configure production redirect URIs

### 2. Build Configuration
- Ensure API routes are included in build
- Configure proper CORS settings
- Set up proper error handling

### 3. Monitoring
- Monitor API usage and rate limits
- Track authentication success/failure rates
- Monitor error rates and performance

## Migration from Mock Data

To switch from mock data to real Spotify data:

1. **Update Context Providers**: Replace mock data with Spotify API calls
2. **Update Components**: Handle loading states and errors
3. **Update Types**: Use Spotify API types instead of mock types
4. **Test Thoroughly**: Ensure all functionality works with real data

## Future Enhancements

### 1. Advanced Features
- Collaborative playlists
- Social features (following, sharing)
- Real-time updates
- Offline playback

### 2. Performance
- Implement caching strategies
- Use Spotify's Web Playback SDK
- Optimize API calls
- Implement virtual scrolling

### 3. User Experience
- Seamless authentication
- Better error handling
- Loading states
- Offline support

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure redirect URIs are properly configured
2. **Token Expired**: Implement automatic token refresh
3. **Rate Limiting**: Implement proper rate limiting and backoff
4. **Authentication Loop**: Check redirect URI configuration

### Debug Tools

- Use Spotify's Web API Console for testing
- Check browser network tab for API calls
- Use console logs for debugging
- Monitor server logs for errors

## Resources

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [OAuth 2.0 PKCE RFC](https://tools.ietf.org/html/rfc7636)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)
