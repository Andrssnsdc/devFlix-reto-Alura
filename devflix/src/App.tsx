import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { NewVideo } from './pages/NewVideo';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Simular carga de la aplicación y eliminar preloader
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('opacity-0'); // Suaviza la opacidad
      setTimeout(() => {
        preloader.remove(); // Elimina el preloader del DOM
        setIsLoaded(true); // Cambia el estado para mostrar el contenido
      }, 500); // Duración de la animación
    }
  }, []);

  return (
    <>
      {!isLoaded && (
        // Este es el preloader que aparece antes de que cargue la app
        <div
          id="preloader"
          className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50 transition-opacity duration-500"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className={`${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        <Router>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<NewVideo />} />
              </Routes>
              <Footer />
            </div>
          </AppProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
