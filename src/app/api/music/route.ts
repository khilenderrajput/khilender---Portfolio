import { NextResponse } from 'next/server';

interface CatalogSong {
  id: number | string;
  title: string;
  artist: string;
  album?: string | null;
  cover: string;
  preview: string | null;
  externalUrl: string;
  isFavorite?: boolean;
  appleMusicId?: string | number | null;
}

// Explicit set of blocked titles for code-level filtering
const BLOCKED_TITLES = new Set([
  'those eyes',
  'another love',
  'someone you loved',
  'lovely'
]);

// Complete Music Library (20 Active Songs)
const REQUIRED_TRACKS = [
  // FEATURED / FAVORITE SONG
  {
    id: 1,
    title: 'Zehnaseeb',
    artist: 'Vishal & Shekhar, Chinmayi Sripada, Shekhar Ravjiani',
    searchQuery: 'Zehnaseeb Hasee Toh Phasee',
    isFavorite: true,
    cover: '/images/zehnaseeb.jpg',
    defaultExternalUrl: 'https://music.apple.com/us/album/zehnaseeb/783487038?i=783487058'
  },
  {
    id: 2,
    title: 'For A Reason',
    artist: 'Karan Aujla & Ikky',
    searchQuery: 'For A Reason Karan Aujla Ikky',
    cover: '/images/for-a-reason.jpg',
    defaultExternalUrl: 'https://music.apple.com/us/album/for-a-reason/1829591921?i=1829591983'
  },
  {
    id: 3,
    title: 'Baarishein',
    artist: 'Anuv Jain',
    searchQuery: 'Baarishein Anuv Jain',
    cover: '/images/baarishein.jpg',
    defaultExternalUrl: 'https://music.apple.com/us/album/baarishein/1739440815?i=1739441072'
  },
  {
    id: 4,
    title: 'Tum Se Hi',
    artist: 'Pritam & Mohit Chauhan',
    searchQuery: 'Tum Se Hi Pritam Mohit Chauhan',
    cover: '/images/tum-se-hi.jpg',
    defaultExternalUrl: 'https://music.apple.com/us/album/tum-se-hi/1134725343?i=1134725347'
  },

  // PRESERVED EXISTING LIBRARY SONGS
  { id: 5, title: 'All Too Well', artist: 'Taylor Swift', searchQuery: 'All Too Well Taylor Swift', cover: '/images/all-too-well.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/all-too-well-10-minute-version-taylors-version/1592603522' },
  { id: 6, title: 'Cruel Summer', artist: 'Taylor Swift', searchQuery: 'Cruel Summer Taylor Swift', cover: '/images/cruel-summer.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/cruel-summer/1468058728' },
  { id: 7, title: 'The Night We Met', artist: 'Lord Huron', searchQuery: 'The Night We Met Lord Huron', cover: '/images/the-night-we-met.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/the-night-we-met/973347101' },
  { id: 8, title: 'Glimpse of Us', artist: 'Joji', searchQuery: 'Glimpse of Us Joji', cover: '/images/glimpse-of-us.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/glimpse-of-us/1626244670' },
  { id: 9, title: 'Khat', artist: 'Navjot Ahuja', searchQuery: 'Khat Navjot Ahuja', cover: '/images/khat.jpg', defaultExternalUrl: 'https://music.apple.com/us/artist/navjot-ahuja/1541484088' },
  { id: 10, title: 'Bairan', artist: 'Banjaare', searchQuery: 'Bairan Banjaare', cover: '/images/bairan.jpg', defaultExternalUrl: 'https://music.apple.com/us/artist/banjaare/1618844890' },
  { id: 11, title: 'Tera Hone Laga Hoon', artist: 'Pritam & Atif Aslam', searchQuery: 'Tera Hone Laga Hoon Pritam Atif Aslam', cover: '/images/7.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/tera-hone-laga-hoon/1134725345' },
  { id: 12, title: 'Until I Found You', artist: 'Stephen Sanchez', searchQuery: 'Until I Found You Stephen Sanchez', cover: '/images/8.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/until-i-found-you/1583002693' },
  { id: 13, title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', searchQuery: 'I Wanna Be Yours Arctic Monkeys', cover: '/images/9.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/i-wanna-be-yours/663097964' },
  { id: 14, title: 'Let Her Go', artist: 'Passenger', searchQuery: 'Let Her Go Passenger', cover: '/images/10.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/let-her-go/1440816828' },
  { id: 15, title: 'Dandelions', artist: 'Ruth B.', searchQuery: 'Dandelions Ruth B', cover: '/images/15.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/dandelions/1220963506' },
  { id: 16, title: 'Night Changes', artist: 'One Direction', searchQuery: 'Night Changes One Direction', cover: '/images/16.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/night-changes/935587784' },
  { id: 17, title: 'Photograph', artist: 'Ed Sheeran', searchQuery: 'Photograph Ed Sheeran', cover: '/images/17.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/photograph/858518210' },
  { id: 18, title: 'Love Yourself', artist: 'Justin Bieber', searchQuery: 'Love Yourself Justin Bieber', cover: '/images/18.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/love-yourself/1440845344' },
  { id: 19, title: 'Heat Waves', artist: 'Glass Animals', searchQuery: 'Heat Waves Glass Animals', cover: '/images/19.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/heat-waves/1508566994' },
  { id: 20, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', searchQuery: 'Die With A Smile Lady Gaga Bruno Mars', cover: '/images/20.jpg', defaultExternalUrl: 'https://music.apple.com/us/song/die-with-a-smile/1762740694' }
];

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
      // CRITICAL RULE: Never pass Apple Music webpage URL as audio source!
      if (!trimmed.includes('music.apple.com')) {
        return trimmed;
      }
    }
  }

  return null;
}

const catalogCache = new Map<string, { data: CatalogSong; timestamp: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes server-side cache

export async function GET() {
  // Filter initial track list against BLOCKED_TITLES
  const activeTracksList = REQUIRED_TRACKS.filter((t) => {
    const titleLower = (t.title || '').trim().toLowerCase();
    return !BLOCKED_TITLES.has(titleLower);
  });

  const tracks: CatalogSong[] = await Promise.all(
    activeTracksList.map(async (track) => {
      const cacheKey = `track-${track.id}`;
      const cached = (catalogCache && typeof catalogCache.get === 'function') ? catalogCache.get(cacheKey) : null;
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }

      let albumName: string | null = null;
      let liveCover: string | null = null;
      let liveExternalUrl: string | null = null;
      let previewUrl: string | null = null;
      let appleMusicId: string | number | null = null;

      try {
        const queryTerm = track.searchQuery || `${track.title} ${track.artist}`;
        const appleApiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(queryTerm)}&entity=song&limit=1`;

        const res = await fetch(appleApiUrl, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          next: { revalidate: 1800 }
        });

        if (res.ok) {
          const data = await res.json();
          if (data?.resultCount > 0 && Array.isArray(data?.results)) {
            const item = data.results[0];
            previewUrl = getPlayablePreview(item);
            albumName = item.collectionName || null;
            appleMusicId = item.trackId || item.id || null;
            if (item.trackViewUrl && item.trackViewUrl.startsWith('http')) {
              liveExternalUrl = item.trackViewUrl;
            }
            if (item.artworkUrl100) {
              liveCover = item.artworkUrl100.replace('100x100bb', '600x600bb');
            }
          }
        }
      } catch (err: any) {
        console.error(`[Apple Music Catalog API Error for ${track.title}]`, err?.message || err);
      }

      const songData: CatalogSong = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        album: albumName,
        cover: liveCover || track.cover,
        preview: previewUrl, // Official playable audio preview URL or null
        externalUrl: liveExternalUrl || track.defaultExternalUrl,
        isFavorite: track.isFavorite || false,
        appleMusicId: appleMusicId
      };

      catalogCache.set(cacheKey, { data: songData, timestamp: Date.now() });
      return songData;
    })
  );

  // Final code-level exclusion filter check
  const finalTracks = tracks.filter((t) => {
    const titleLower = (t.title || '').trim().toLowerCase();
    return !BLOCKED_TITLES.has(titleLower);
  });

  return NextResponse.json(finalTracks);
}
