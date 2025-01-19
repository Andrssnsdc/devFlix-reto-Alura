import { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause } from 'lucide-react';

export function Banner() {
  const { videos, categories } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(() =>
    videos[Math.floor(Math.random() * videos.length)]
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isYouTube = currentVideo?.videoUrl.includes('youtube.com') || currentVideo?.videoUrl.includes('youtu.be');

  useEffect(() => {
    if (!currentVideo || (!videoRef.current && !iframeRef.current)) return;

    if (!isYouTube) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
        videoRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      };

      videoRef.current?.addEventListener('loadeddata', handleLoadedData);
      return () => {
        videoRef.current?.removeEventListener('loadeddata', handleLoadedData);
      };
    } else {
      setVideoLoaded(true); // For YouTube videos, consider it loaded immediately
    }
  }, [currentVideo, isYouTube]);

  const togglePlay = () => {
    if (isYouTube) {
      // For YouTube, we'll toggle play using iframe methods
      const iframe = iframeRef.current;
      if (iframe) {
        const iframeWindow = iframe.contentWindow;
        if (iframeWindow) {
          iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
          setIsPlaying(true);
        }
      }
    } else if (videoRef.current && videoLoaded) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!currentVideo) {
    return null;
  }

  const category = categories.find((c) => c.id === currentVideo.category);

  return (
    <div className="relative h-[60vh] overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {currentVideo.videoUrl && !isYouTube && (
          <video
            ref={videoRef}
            src={currentVideo.videoUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-50"
            onError={() => setVideoLoaded(false)}
          />
        )}

        {currentVideo.videoUrl && isYouTube && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${currentVideo.videoUrl.split('/').pop()?.split('=')[1]}?autoplay=1&mute=1`}
            title={currentVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover opacity-50"
          ></iframe>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-lg relative">
            <div
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm"
              style={{
                backgroundColor: `${category?.color}20`,
                color: category?.color,
                boxShadow: `0 0 20px ${category?.color}30`,
              }}
            >
              {category?.name}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {currentVideo.title}
            </h1>
            <p className="text-xl text-gray-300 mb-6 line-clamp-2">
              {currentVideo.description}
            </p>
            {videoLoaded && (
              <button
                onClick={togglePlay}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: `0 0 30px ${category?.color}30`,
                }}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
                <span>{isPlaying ? 'Pause' : 'Play'} Video</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
