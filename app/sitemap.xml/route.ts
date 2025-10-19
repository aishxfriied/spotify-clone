import { NextResponse } from 'next/server';
import { mockAlbums, mockPlaylists } from '@/data/mockData';

export async function GET() {
  const baseUrl = 'https://spotify-clone-nextjs.vercel.app';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic album pages
  const albumPages = mockAlbums.map(album => ({
    url: `${baseUrl}/album/${album.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Dynamic playlist pages
  const playlistPages = mockPlaylists.map(playlist => ({
    url: `${baseUrl}/playlist/${playlist.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const allPages = [...staticPages, ...albumPages, ...playlistPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

