import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://spotify-clone-nextjs.vercel.app/sitemap.xml

# Disallow admin or private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow all other content
Allow: /album/
Allow: /playlist/
Allow: /search
Allow: /profile
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

