export interface Video {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    videoUrl: string;
    createdAt: number;
  }
  
  export interface Category {
    id: string;
    name: string;
    color: string;
  }
  
  export type VideoFormData = Omit<Video, 'id' | 'createdAt'>;