import { useRef, useEffect, useState } from 'react';
import { X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    videoUrl: string;
    description: string;
  };
}

export default function VideoPopup({ isOpen, onClose, video }: VideoPopupProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [popupTop, setPopupTop] = useState(0); // Posición calculada del popup
  const [popupLeft, setPopupLeft] = useState(0); // Posición horizontal calculada
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const popupWidth = popupRef.current.offsetWidth;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const scrollPosition = window.scrollY;

      // Calcular la posición vertical del popup para centrarlo en la pantalla
      const calculatedTop = scrollPosition + (windowHeight - popupHeight) / 2;

      // Calcular la posición horizontal del popup para centrarlo
      const calculatedLeft = (windowWidth - popupWidth) / 2;

      setPopupTop(calculatedTop);
      setPopupLeft(calculatedLeft);
    }
  }, [isOpen]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await popupRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="relative w-full max-w-4xl mx-4 bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
        style={{
          maxHeight: 'calc(100vh - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          top: `${popupTop}px`, // Ajustamos la posición vertical calculada
          left: `${popupLeft}px`, // Ajustamos la posición horizontal calculada
        }}
      >
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
          <button
            onClick={toggleMute}
            className="p-2 bg-gray-800/90 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/90 transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 bg-gray-800/90 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/90 transition-all"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-800/90 rounded-full text-gray-300 hover:text-red-500 hover:bg-gray-700/90 transition-all"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="relative aspect-video bg-black">
        <div className="relative aspect-video bg-black">
  {video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
    <iframe
      src={`https://www.youtube.com/embed/${video.videoUrl.split('/').pop()?.split('=')[1]}?autoplay=1&mute=${isMuted ? 1 : 0}`}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  ) : (
    <iframe
      src={`${video.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  )}
</div>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <h3 className="text-xl font-semibold text-white mb-2">{video.title}</h3>
          <p className="text-gray-400">{video.description}</p>
        </div>
      </div>
    </div>
  );
}
