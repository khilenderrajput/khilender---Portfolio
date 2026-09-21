'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface Track {
  id: number | string;
  title: string;
  artist: string;
  album?: string | null;
  cover?: string | null;
  preview?: string | null;
  externalUrl?: string | null;
  isFavorite?: boolean;
  top?: string;
  left?: string;
  rotate?: string;
}

interface AudioPlayerProps {
  isPlaying?: boolean;
  onPlayStateChange?: (playing: boolean) => void;
}

// Explicit set of blocked titles for code-level filtering
export const BLOCKED_TITLES = new Set([
  'those eyes',
  'another love',
  'someone you loved',
  'lovely'
]);

const SCATTERED_POSITIONS = [
  { top: '3%', left: '3%', rotate: '-6deg' },
  { top: '2%', left: '26%', rotate: '4deg' },
  { top: '4%', left: '49%', rotate: '-3deg' },
  { top: '2%', left: '73%', rotate: '5deg' },
  { top: '24%', left: '8%', rotate: '3deg' },
  { top: '22%', left: '33%', rotate: '-5deg' },
  { top: '25%', left: '57%', rotate: '6deg' },
  { top: '23%', left: '80%', rotate: '-4deg' },
  { top: '44%', left: '4%', rotate: '5deg' },
  { top: '43%', left: '27%', rotate: '-7deg' },
  { top: '46%', left: '49%', rotate: '4deg' },
  { top: '42%', left: '72%', rotate: '-3deg' },
  { top: '65%', left: '7%', rotate: '-4deg' },
  { top: '67%', left: '30%', rotate: '6deg' },
  { top: '64%', left: '53%', rotate: '-5deg' },
  { top: '68%', left: '76%', rotate: '3deg' },
  { top: '13%', left: '17%', rotate: '-2deg' },
  { top: '35%', left: '42%', rotate: '7deg' },
  { top: '55%', left: '83%', rotate: '-6deg' },
  { top: '72%', left: '39%', rotate: '2deg' }
];

export const INITIAL_TRACKS: Track[] = [
  { id: 1, title: 'Zehnaseeb', artist: 'Vishal & Shekhar, Chinmayi Sripada', cover: '/images/zehnaseeb.jpg', isFavorite: true, top: '3%', left: '3%', rotate: '-6deg' },
  { id: 2, title: 'For A Reason', artist: 'Karan Aujla & Ikky', cover: '/images/for-a-reason.jpg', top: '2%', left: '26%', rotate: '4deg' },
  { id: 3, title: 'Baarishein', artist: 'Anuv Jain', cover: '/images/baarishein.jpg', top: '4%', left: '49%', rotate: '-3deg' },
  { id: 4, title: 'Tum Se Hi', artist: 'Pritam & Mohit Chauhan', cover: '/images/tum-se-hi.jpg', top: '2%', left: '73%', rotate: '5deg' },
  { id: 5, title: 'All Too Well', artist: 'Taylor Swift', cover: '/images/all-too-well.jpg', top: '24%', left: '8%', rotate: '3deg' },
  { id: 6, title: 'Cruel Summer', artist: 'Taylor Swift', cover: '/images/cruel-summer.jpg', top: '22%', left: '33%', rotate: '-5deg' },
  { id: 7, title: 'The Night We Met', artist: 'Lord Huron', cover: '/images/the-night-we-met.jpg', top: '25%', left: '57%', rotate: '6deg' },
  { id: 8, title: 'Glimpse of Us', artist: 'Joji', cover: '/images/glimpse-of-us.jpg', top: '23%', left: '80%', rotate: '-4deg' },
  { id: 9, title: 'Khat', artist: 'Navjot Ahuja', cover: '/images/khat.jpg', top: '44%', left: '4%', rotate: '5deg' },
  { id: 10, title: 'Bairan', artist: 'Banjaare', cover: '/images/bairan.jpg', top: '43%', left: '27%', rotate: '-7deg' },
  { id: 11, title: 'Tera Hone Laga Hoon', artist: 'Pritam & Atif Aslam', cover: '/images/7.jpg', top: '46%', left: '49%', rotate: '4deg' },
  { id: 12, title: 'Until I Found You', artist: 'Stephen Sanchez', cover: '/images/8.jpg', top: '42%', left: '72%', rotate: '-3deg' },
  { id: 13, title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', cover: '/images/9.jpg', top: '65%', left: '7%', rotate: '-4deg' },
  { id: 14, title: 'Let Her Go', artist: 'Passenger', cover: '/images/10.jpg', top: '67%', left: '30%', rotate: '6deg' },
  { id: 15, title: 'Dandelions', artist: 'Ruth B.', cover: '/images/15.jpg', top: '64%', left: '53%', rotate: '-5deg' },
  { id: 16, title: 'Night Changes', artist: 'One Direction', cover: '/images/16.jpg', top: '68%', left: '76%', rotate: '3deg' },
  { id: 17, title: 'Photograph', artist: 'Ed Sheeran', cover: '/images/17.jpg', top: '13%', left: '17%', rotate: '-2deg' },
  { id: 18, title: 'Love Yourself', artist: 'Justin Bieber', cover: '/images/18.jpg', top: '35%', left: '42%', rotate: '7deg' },
  { id: 19, title: 'Heat Waves', artist: 'Glass Animals', cover: '/images/19.jpg', top: '55%', left: '83%', rotate: '-6deg' },
  { id: 20, title: 'Die With A Smile', artist: 'Lady Gaga & Bruno Mars', cover: '/images/20.jpg', top: '72%', left: '39%', rotate: '2deg' }
];

/**
 * Robust helper to extract a valid playable audio preview URL from an Apple Music catalog track.
 * Strictly returns null if no valid audio asset URL exists, and NEVER returns an Apple Music webpage URL.
 */
export function getPlayablePreview(track: any): string | null {
  if (!track) return null;

  const attrs = track.attributes || track;

  const candidates = [
    track.preview,
    track.preview_url,
    attrs?.preview,
    attrs?.preview_url,
    attrs?.previewUrl,
    attrs?.previews?.[0]?.url,
    attrs?.previews?.[0]?.hlsUrl,
    attrs?.previewAssets?.[0]?.url,
    attrs?.previewAssets?.[0]?.hlsUrl,
    attrs?.audio,
    attrs?.audio_url,
    attrs?.stream_url,
    attrs?.media_url,
    attrs?.playback_url
  ];

  for (const cand of candidates) {
    if (typeof cand === 'string' && cand.trim().startsWith('http')) {
      const url = cand.trim();
      if (!url.includes('music.apple.com')) {
        return url;
      }
    }
  }

  return null;
}

export default function AudioPlayer({ isPlaying: externalIsPlaying, onPlayStateChange }: AudioPlayerProps) {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Local storage & session storage cleanup for blocked titles on mount
  useEffect(() => {
    try {
      const storageKeys = ['audio_player_track', 'music_playlist', 'currentTrack', 'portfolio_music', 'recentTracks'];
      storageKeys.forEach((key) => {
        const itemVal = localStorage.getItem(key) || sessionStorage.getItem(key);
        if (itemVal) {
          const valLower = itemVal.toLowerCase();
          if (
            valLower.includes('those eyes') ||
            valLower.includes('another love') ||
            valLower.includes('someone you loved') ||
            valLower.includes('lovely')
          ) {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
          }
        }
      });
    } catch (err) {
      // Ignore storage permission exceptions
    }
  }, []);

  // Sync external play state if passed
  useEffect(() => {
    if (externalIsPlaying !== undefined && externalIsPlaying !== isPlaying) {
      setIsPlaying(externalIsPlaying);
      if (audioRef.current) {
        if (externalIsPlaying) {
          audioRef.current.play().catch((err) => console.log('Playback prevented:', err));
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [externalIsPlaying]);

  // Fetch music tracks from internal backend proxy
  useEffect(() => {
    async function loadTracks() {
      try {
        setIsLoading(true);
        setApiError(null);
        const res = await fetch('/api/music');
        if (!res.ok) {
          throw new Error('Music service temporarily unavailable.');
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Explicit code-level exclusion filter
          const cleanData = data
            .filter((track: any) => {
              const titleLower = (track.title || '').trim().toLowerCase();
              return !BLOCKED_TITLES.has(titleLower);
            })
            .map((track: any, idx: number) => ({
              ...track,
              top: SCATTERED_POSITIONS[idx % SCATTERED_POSITIONS.length].top,
              left: SCATTERED_POSITIONS[idx % SCATTERED_POSITIONS.length].left,
              rotate: SCATTERED_POSITIONS[idx % SCATTERED_POSITIONS.length].rotate,
            }));
          setTracks(cleanData);
        }
      } catch (err: any) {
        console.error('[AudioPlayer Error]', err);
        // Fall back gracefully to INITIAL_TRACKS with zero broken state
      } finally {
        setIsLoading(false);
      }
    }
    loadTracks();
  }, []);

  // Shared audio element setup
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
      handleNext();
    };

    const handleError = (e: Event) => {
      console.warn('[Audio Playback Error]', e);
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Filter tracks with explicit BLOCKED_TITLES guard
  const filteredTracks = tracks.filter((t) => {
    const titleLower = (t.title || '').trim().toLowerCase();
    return !BLOCKED_TITLES.has(titleLower);
  });

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

  // Track playback handlers
  const playTrack = (index: number) => {
    const targetTrack = tracks[index];
    if (!targetTrack) return;

    if (BLOCKED_TITLES.has((targetTrack.title || '').trim().toLowerCase())) return;

    const validPreview = getPlayablePreview(targetTrack);

    if (currentTrackIndex === index) {
      // Toggle play/pause
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      } else {
        if (validPreview && audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            if (onPlayStateChange) onPlayStateChange(true);
          }).catch((err) => console.warn('Audio play error:', err));
        }
      }
      return;
    }

    // Switch track
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      if (validPreview) {
        audioRef.current.src = validPreview;
        audioRef.current.load();
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
        }).catch((err) => {
          console.warn('Playback error:', err);
          setIsPlaying(false);
          if (onPlayStateChange) onPlayStateChange(false);
        });
      } else {
        audioRef.current.src = '';
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      }
    }
  };

  const handleNext = () => {
    if (tracks.length === 0) return;
    const currentIndex = currentTrackIndex ?? 0;
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };

  const handlePrev = () => {
    if (tracks.length === 0) return;
    const currentIndex = currentTrackIndex ?? 0;
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="music" className="py-10 md:py-12 bg-[#0A0A0A] text-[#888888] select-none border-0 border-none outline-none shadow-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative border-0 border-none">
        
        {/* Header */}
        <div className="mb-5 border-0 border-none">
          <h2 className="!text-[36px] sm:!text-[40px] md:!text-[44px] font-black tracking-tight text-[#E5DFD3] font-sans border-0 border-none outline-none shadow-none" style={{ fontSize: '42px' }}>
            <span style={{ fontSize: '42px' }} className="!text-[36px] sm:!text-[40px] md:!text-[44px]">
              Music I might be listening to
            </span>
          </h2>
        </div>

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-5 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-red-200 text-xs font-mono flex items-center justify-between">
            <span>⚠️ {apiError}</span>
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1 bg-red-900/60 hover:bg-red-800 text-white rounded-md text-[11px] font-mono transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Scattered Music Card Container Box (#0F0F0F Card Area) */}
        <div className="w-full bg-[#0F0F0F] border border-[#222222] rounded-3xl p-4 sm:p-5 relative min-h-[410px] md:min-h-[450px] shadow-2xl">
          
          {/* Scattered Polaroid Cards (Desktop / Tablet view) */}
          <div className="hidden sm:block relative w-full h-[400px] md:h-[430px]">
            {filteredTracks.map((track) => {
              const fullListIndex = tracks.findIndex((t) => t.id === track.id);
              const isCurrent = currentTrackIndex === fullListIndex;
              const activePlaying = isCurrent && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(fullListIndex)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${track.title} by ${track.artist}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      playTrack(fullListIndex);
                    }
                  }}
                  style={{
                    top: track.top || '10%',
                    left: track.left || '10%',
                    transform: `rotate(${track.rotate || '0deg'})`,
                  }}
                  className={`group absolute w-24 h-24 md:w-32 md:h-32 p-1.5 bg-[#141414] border rounded-2xl transition-all duration-300 transform hover:scale-110 hover:z-40 hover:rotate-0 cursor-pointer shadow-xl flex flex-col ${
                    isCurrent
                      ? 'border-[#BFA678] ring-2 ring-[#BFA678]/80 shadow-[0_0_25px_rgba(191,166,120,0.5)] bg-[#1A1812] z-30 scale-105'
                      : track.isFavorite
                      ? 'border-[#BFA678]/50 ring-1 ring-[#BFA678]/20 bg-[#151410]'
                      : 'border-[#262626] hover:border-[#BFA678]/50'
                  }`}
                >
                  {/* Floating Hover Info Floating Directly ABOVE Card/Image (Plain Text Only, No Box/Border/Background) */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50 text-center w-max max-w-[160px] md:max-w-[180px] bg-transparent border-0 shadow-none outline-none p-0">
                    <h3 className="font-mono text-[11px] md:text-xs text-[#E5DFD3] font-bold truncate leading-tight drop-shadow-md" title={track.title}>
                      {track.title}
                    </h3>
                    <p className="font-mono text-[9px] md:text-[10px] text-[#A0A0A0] truncate mt-0.5 drop-shadow-sm" title={track.artist}>
                      {track.artist}
                    </p>
                  </div>

                  {/* Polaroid Photo Image Container (ONLY IMAGE, NO OVERLAY TEXT ON IMAGE) */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#1A1A1A]">
                    {track.isFavorite && (
                      <span className="absolute top-1 right-1 z-30 px-1 py-0.5 rounded-full bg-black/85 border border-[#BFA678]/80 text-[#BFA678] font-mono text-[7px] font-bold shadow-sm pointer-events-none">
                        ♥
                      </span>
                    )}

                    {track.cover ? (
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/1.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E] text-[#BFA678] font-mono text-sm font-bold">
                        ♪
                      </div>
                    )}

                    {/* Animated Soundwave Equalizer when active & playing */}
                    {activePlaying && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
                        <div className="flex items-end space-x-1 h-5">
                          <span className="w-1 bg-[#BFA678] animate-bounce h-full rounded-full" />
                          <span className="w-1 bg-[#BFA678] animate-bounce delay-150 h-3/4 rounded-full" />
                          <span className="w-1 bg-[#BFA678] animate-bounce delay-300 h-1/2 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Responsive Polaroid Grid for Mobile View */}
          <div className="block sm:hidden grid grid-cols-2 gap-3.5 p-1 pt-6">
            {filteredTracks.map((track) => {
              const fullListIndex = tracks.findIndex((t) => t.id === track.id);
              const isCurrent = currentTrackIndex === fullListIndex;
              const activePlaying = isCurrent && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(fullListIndex)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${track.title} by ${track.artist}`}
                  className={`group relative w-full p-2 bg-[#141414] border rounded-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg flex flex-col ${
                    isCurrent
                      ? 'border-[#BFA678] ring-2 ring-[#BFA678]/80 shadow-[0_0_20px_rgba(191,166,120,0.5)] bg-[#1A1812]'
                      : track.isFavorite
                      ? 'border-[#BFA678]/50 ring-1 ring-[#BFA678]/20 bg-[#151410]'
                      : 'border-[#262626]'
                  }`}
                  style={{
                    transform: `rotate(${track.rotate || '0deg'})`,
                  }}
                >
                  {/* Floating Hover Info Floating Directly ABOVE Mobile Card (Plain Text Only) */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none z-50 text-center w-max max-w-[130px] bg-transparent border-0 shadow-none outline-none p-0">
                    <h3 className="font-mono text-[10px] text-[#E5DFD3] font-bold truncate leading-tight drop-shadow-md" title={track.title}>
                      {track.title}
                    </h3>
                    <p className="font-mono text-[8px] text-[#A0A0A0] truncate mt-0.5 drop-shadow-sm" title={track.artist}>
                      {track.artist}
                    </p>
                  </div>

                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#1A1A1A]">
                    {track.isFavorite && (
                      <span className="absolute top-1 right-1 z-30 px-1 py-0.5 rounded-full bg-black/85 border border-[#BFA678]/80 text-[#BFA678] font-mono text-[7px] font-bold pointer-events-none">
                        ♥
                      </span>
                    )}
                    {track.cover ? (
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/1.jpg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1E1E1E] text-[#BFA678] font-mono text-sm font-bold">
                        ♪
                      </div>
                    )}

                    {activePlaying && (
                      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center z-10 pointer-events-none">
                        <div className="flex items-end space-x-1 h-5">
                          <span className="w-1 bg-[#BFA678] animate-bounce h-full rounded-full" />
                          <span className="w-1 bg-[#BFA678] animate-bounce delay-150 h-3/4 rounded-full" />
                          <span className="w-1 bg-[#BFA678] animate-bounce delay-300 h-1/2 rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Live Music Player Bar (Rounded Dark Card directly below images) */}
        {(() => {
          const activeIndex = currentTrackIndex !== null ? currentTrackIndex : 0;
          const activeTrack = tracks[activeIndex] || INITIAL_TRACKS[0];
          const playable = getPlayablePreview(activeTrack);

          return (
            <div className="mt-6 w-full bg-[#0F0F0F] border border-[#222222] rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
              
              {/* Left: Thumbnail, Title, Artist */}
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1A1A1A] overflow-hidden shrink-0 border border-[#262626]">
                  {activeTrack.cover ? (
                    <img src={activeTrack.cover} alt={activeTrack.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#BFA678] font-bold text-xl">♪</div>
                  )}
                </div>
                <div className="min-w-0 flex-1 sm:flex-initial">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-white truncate leading-snug" title={activeTrack.title}>
                    {activeTrack.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#888888] truncate mt-0.5" title={activeTrack.artist}>
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              {/* Center: Timeline Progress Bar with Timestamps */}
              <div className="flex-1 max-w-xl w-full mx-auto md:mx-6 flex flex-col justify-center">
                <div className="relative w-full flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={duration || 30}
                    value={currentTime}
                    onChange={handleSeek}
                    disabled={!playable}
                    aria-label="Seek timeline"
                    className="w-full h-1 bg-[#222222] rounded-full appearance-none cursor-pointer accent-[#D4C5A9] disabled:opacity-40"
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[11px] text-[#666666] mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 30)}</span>
                </div>
              </div>

              {/* Right: Functional Playback Controls (Previous, Play/Pause Toggle, Next) */}
              <div className="flex items-center space-x-3 shrink-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous track"
                  className="w-10 h-10 rounded-full border border-[#262626] bg-[#141414] hover:bg-[#202020] text-[#CCCCCC] hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current text-[#CCCCCC]" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                  </svg>
                </button>

                <button
                  onClick={() => playTrack(activeIndex)}
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                  className="w-12 h-12 rounded-full bg-[#D4C5A9] hover:bg-[#e2d6bf] text-black flex items-center justify-center font-bold text-base shadow-lg transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5 fill-current text-black" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 fill-current text-black translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next track"
                  className="w-10 h-10 rounded-full border border-[#262626] bg-[#141414] hover:bg-[#202020] text-[#CCCCCC] hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-95"
                >
                  <svg className="w-4 h-4 fill-current text-[#CCCCCC]" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                  </svg>
                </button>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
}
