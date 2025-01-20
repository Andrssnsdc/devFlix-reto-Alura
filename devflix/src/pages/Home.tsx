import React from "react";
import { Banner } from "../components/Banner";
import { VideoCard } from "../components/VideoCard";
import { VideoForm } from "../components/VideoForm";
import { useApp } from "../context/AppContext";
import type { Video } from "../types";

export function Home() {
  const { videos, categories, editVideo } = useApp();
  const [editingVideo, setEditingVideo] = React.useState<Video | null>(null);
  const [scrollY, setScrollY] = React.useState(0); // Estado para rastrear el scroll

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Captura el desplazamiento vertical
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEdit = (data: VideoFormData) => {
    if (editingVideo) {
      editVideo(editingVideo.id, data);
      setEditingVideo(null);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-950 via-blue-950 to-cyan-950">
      <Banner />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.map((category) => {
          const categoryVideos = videos.filter((video) => video.category === category.id);

          if (categoryVideos.length === 0) return null;

          return (
            <section key={category.id} className="mb-12 relative">
              {/* Efecto de luz */}
              <div
                className="absolute inset-0 opacity-30 my-4 h-full pb-4"
                style={{
                  background: `radial-gradient(circle at 50% -50%, ${category.color}, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div
                className="flex items-center space-x-4 mb-6 relative z-10"
                style={{ "--category-color": category.color } as React.CSSProperties}
              >
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                <div className="h-px flex-grow opacity-50 rounded" style={{ backgroundColor: category.color }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {categoryVideos.map((video) => (
                  <VideoCard key={video.id} video={video} onEdit={setEditingVideo} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {editingVideo && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 bg-black/70 flex items-center justify-center p-4 z-50 w-full p-8 m-0"
          style={{ top: `${scrollY + 20}px` }} // Posición dinámica basada en el scroll
        >
          <div className="bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Edit Video</h2>
              <VideoForm initialData={editingVideo} onSubmit={handleEdit} onCancel={() => setEditingVideo(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
