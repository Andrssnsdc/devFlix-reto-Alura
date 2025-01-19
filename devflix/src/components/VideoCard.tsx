import React, { useState } from 'react';
import { Pencil, Trash2, Play } from 'lucide-react';
import { Video } from '../types';
import { useApp } from '../context/AppContext';
import VideoPopup from './VideoPopUp';
import AlertDialog from './Alertcard';

interface VideoCardProps {
  video: Video;
  onEdit: (video: Video) => void;
}

export function VideoCard({ video, onEdit }: VideoCardProps) {
  const { deleteVideo, categories } = useApp();
  const category = categories.find(c => c.id === video.category);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAlertOpen(true);
  };

  return (
    <>
      <div
        className="group relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-sky-900 to-blue-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--category-color)]"
        style={{ '--category-color': `${category?.color}40` } as React.CSSProperties}
      >
        <div className="relative h-48">
          <img
            src={video.imageUrl}
            alt={video.title}
            className="w-full h-full object-cover"
            onLoad={() => setThumbnailLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Play className="w-16 h-16 text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(video)}
            className="p-2 bg-gray-800/90 rounded-full text-gray-300 hover:text-white hover:bg-gray-700/90 transition-all hover:scale-110"
            style={{ '--tw-ring-color': category?.color }}
          >
            <Pencil className="h-5 w-5" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-2 bg-gray-800/90 rounded-full text-gray-300 hover:text-red-500 hover:bg-gray-700/90 transition-all hover:scale-110"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div
            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 transition-colors"
            style={{
              backgroundColor: `${category?.color}20`,
              color: category?.color,
              boxShadow: `0 0 12px ${category?.color}30`
            }}
          >
            {category?.name}
          </div>
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{video.title}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
        </div>
      </div>

      <VideoPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        video={video}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={() => deleteVideo(video.id)}
        title={video.title}
      />
    </>
  );
}