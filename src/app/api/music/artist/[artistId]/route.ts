import { NextResponse } from 'next/server';

// Explicit set of blocked titles for code-level filtering
const BLOCKED_TITLES = new Set([
  'those eyes',
  'another love',
  'someone you loved',
  'lovely'
]);

// Server-side in-memory cache to prevent unnecessary API calls
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes cache

/**
 * Safely inspects an Apple Music / RapidAPI / MusicKit API response item
 * for official playable audio preview fields (URL / HLS URL).
 * STRICTLY returns null if no valid audio preview field exists.
 * NEVER returns an Apple Music webpage URL (e.g. music.apple.com).
 */
function getPlayablePreview(item: any): string | null {
  if (!item) return null;

  const attrs = item.attributes || item;

  const candidates = [
    attrs?.previewUrl,
    attrs?.preview_url,
    attrs?.previews?.[0]?.url,
    attrs?.previews?.[0]?.hlsUrl,
    attrs?.previewAssets?.[0]?.url,
    attrs?.previewAssets?.[0]?.hlsUrl,
    attrs?.audio,
    attrs?.audio_url,
    attrs?.stream_url,
    attrs?.media_url,
    attrs?.playback_url,
    item?.previewUrl,
    item?.preview_url,
    item?.previews?.[0]?.url,
    item?.previews?.[0]?.hlsUrl,
    item?.previewAssets?.[0]?.url,
    item?.previewAssets?.[0]?.hlsUrl,
    item?.audio,
    item?.audio_url
  ];

  for (const cand of candidates) {
    if (typeof cand === 'string' && cand.trim().startsWith('http')) {
      const trimmed = cand.trim();
      if (!trimmed.includes('music.apple.com')) {
        return trimmed;
      }
    }
  }

  return null;
}

export function generateStaticParams() {
  return [{ artistId: 'default' }];
}

export async function GET(
  request: Request,
  { params }: { params: { artistId: string } }
) {
  const artistId = params?.artistId;

  if (!artistId) {
    return NextResponse.json(
      { error: 'Missing artistId parameter' },
      { status: 400 }
    );
  }

  // Check cache
  const cached = (cache && typeof cache.get === 'function') ? cache.get(artistId) : null;
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json(cached.data);
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  const devToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN;

  try {
    let rawData: any = null;

    // 1. Try Apple Music Developer API if token exists
    if (devToken) {
      const appleRes = await fetch(
        `https://api.music.apple.com/v1/catalog/us/artists/${encodeURIComponent(artistId)}/singles`,
        {
          headers: {
            'Authorization': `Bearer ${devToken}`,
            'Accept': 'application/json'
          },
          next: { revalidate: 900 }
        }
      );
      if (appleRes.ok) {
        rawData = await appleRes.json();
      }
    }

    // 2. Fallback to RapidAPI if key is configured
    if (!rawData && apiKey && apiKey !== 'YOUR_NEW_RAPIDAPI_KEY') {
      const rapidRes = await fetch(
        `https://apple-music-scraper.p.rapidapi.com/api/v1/artists/singles?lang=en-US&artist_id=${encodeURIComponent(artistId)}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'x-rapidapi-host': 'apple-music-scraper.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
          },
          next: { revalidate: 900 }
        }
      );
      if (rapidRes.ok) {
        rawData = await rapidRes.json();
      }
    }

    if (!rawData) {
      // 3. Fallback to Apple Music catalog search API for artist
      const catalogRes = await fetch(
        `https://itunes.apple.com/lookup?id=${encodeURIComponent(artistId)}&entity=song&limit=20`,
        { next: { revalidate: 900 } }
      );
      if (catalogRes.ok) {
        rawData = await catalogRes.json();
      }
    }

    if (!rawData) {
      return NextResponse.json(
        { error: 'Music service temporarily unavailable.' },
        { status: 503 }
      );
    }

    const items = Array.isArray(rawData?.data)
      ? rawData.data
      : Array.isArray(rawData?.results)
      ? rawData.results.filter((i: any) => i.wrapperType === 'track')
      : [];

    const songs = items
      .map((item: any, index: number) => {
        const attrs = item?.attributes || item;
        const previewUrl = getPlayablePreview(item);

        let artworkUrl: string | null = null;
        if (typeof attrs?.artwork?.url === 'string') {
          artworkUrl = attrs.artwork.url.replace('{w}', '400').replace('{h}', '400');
        } else if (typeof attrs?.artworkUrl100 === 'string') {
          artworkUrl = attrs.artworkUrl100.replace('100x100bb', '400x400bb');
        }

        let externalUrl: string | null = null;
        if (typeof attrs?.url === 'string' && attrs.url.startsWith('http')) {
          externalUrl = attrs.url;
        } else if (typeof attrs?.trackViewUrl === 'string' && attrs.trackViewUrl.startsWith('http')) {
          externalUrl = attrs.trackViewUrl;
        }

        return {
          id: item?.id || item?.trackId || `${artistId}-${index + 1}`,
          title: attrs?.name || attrs?.trackName || 'Unknown Track',
          artist: attrs?.artistName || 'Unknown Artist',
          album: attrs?.albumName || attrs?.collectionName || null,
          cover: artworkUrl,
          preview: previewUrl,
          externalUrl: externalUrl || `https://music.apple.com/us/search?term=${encodeURIComponent((attrs?.name || '') + ' ' + (attrs?.artistName || ''))}`
        };
      })
      .filter((song: any) => {
        const titleLower = (song.title || '').trim().toLowerCase();
        return !BLOCKED_TITLES.has(titleLower);
      });

    const result = {
      artistId,
      total: songs.length,
      songs
    };

    cache.set(artistId, { data: result, timestamp: Date.now() });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[Artist Proxy Exception]', error?.message || error);
    return NextResponse.json(
      { error: 'Music service temporarily unavailable.' },
      { status: 500 }
    );
  }
}
