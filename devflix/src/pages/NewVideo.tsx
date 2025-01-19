import { useNavigate } from 'react-router-dom';
import { VideoForm } from '../components/VideoForm';
import { useApp } from '../context/AppContext';
import { VideoFormData } from '../types';

export function NewVideo() {
  const navigate = useNavigate();
  const { addVideo } = useApp();

  const handleSubmit = (data: VideoFormData) => {
    addVideo(data);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-800 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Add New Video</h1>
        <div className="bg-gray-900 rounded-lg shadow-xl p-6">
          <VideoForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}