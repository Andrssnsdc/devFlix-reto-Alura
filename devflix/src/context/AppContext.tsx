import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, Category, VideoFormData } from '../types';

interface AppContextType {
  videos: Video[];
  categories: Category[];
  addVideo: (video: VideoFormData) => void;
  editVideo: (id: string, video: VideoFormData) => void;
  deleteVideo: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: '1', name: 'Frontend', color: '#6366f1' },
  { id: '2', name: 'Backend', color: '#ec4899' },
  { id: '3', name: 'Innovation', color: '#14b8a6' }
];

const defaultVideos: Video[] = [
    {
      id: '1',
      title: 'Profundización en los Hooks Modernos de React',
      description: 'Domina los Hooks de React con ejemplos prácticos y mejores prácticas. Aprende useState, useEffect, useContext y hooks personalizados.',
      category: '1',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      createdAt: Date.now()
    },
    {
      id: '2',
      title: 'Arquitectura de Microservicios con Node.js',
      description: 'Construye microservicios escalables con Node.js. Incluye descubrimiento de servicios, balanceo de carga y contenedorización.',
      category: '2',
      imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      createdAt: Date.now()
    },
    {
      id: '3',
      title: 'Mejores Prácticas de DevOps 2024',
      description: 'Aprende prácticas modernas de DevOps, pipelines CI/CD e infraestructura como código con ejemplos del mundo real.',
      category: '3',
      imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      createdAt: Date.now()
    },
    {
      id: '4',
      title: 'Técnicas Avanzadas de Animación en CSS',
      description: 'Crea animaciones web impresionantes usando CSS moderno. Aprende sobre keyframes, transiciones y transformaciones 3D.',
      category: '1',
      imageUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      createdAt: Date.now()
    },
    {
      id: '5',
      title: 'Patrones de Diseño de API con GraphQL',
      description: 'Diseña APIs robustas y eficientes con GraphQL. Incluye diseño de esquemas, resolutores y optimización de rendimiento.',
      category: '2',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      createdAt: Date.now()
    },
    {
      id: '6',
      title: 'Gestión Ágil de Proyectos',
      description: 'Domina las metodologías y herramientas ágiles para una gestión efectiva de proyectos de software y colaboración en equipo.',
      category: '3',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
      videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      createdAt: Date.now()
    }
  ];
  

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('devflix_videos');
    return saved ? JSON.parse(saved) : defaultVideos;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('devflix_categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem('devflix_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('devflix_categories', JSON.stringify(categories));
  }, [categories]);

  const addVideo = (videoData: VideoFormData) => {
    const newVideo: Video = {
      ...videoData,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setVideos(prev => [newVideo, ...prev]);
  };

  const editVideo = (id: string, videoData: VideoFormData) => {
    setVideos(prev => prev.map(video => 
      video.id === id ? { ...video, ...videoData } : video
    ));
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(video => video.id !== id));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: crypto.randomUUID()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <AppContext.Provider value={{
      videos,
      categories,
      addVideo,
      editVideo,
      deleteVideo,
      addCategory
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}