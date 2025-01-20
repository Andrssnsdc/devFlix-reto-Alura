import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, X, Maximize2, Minimize2 } from 'lucide-react';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export default function AlertDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
}: AlertDialogProps) {
  const [popupTop, setPopupTop] = useState(0);
  const [popupLeft, setPopupLeft] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const popupWidth = popupRef.current.offsetWidth;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const scrollPosition = window.scrollY;

      const calculatedTop = scrollPosition + (windowHeight - popupHeight) / 2;
      const calculatedLeft = (windowWidth - popupWidth) / 2;

      setPopupTop(calculatedTop);
      setPopupLeft(calculatedLeft);
    }
  }, [isOpen]);

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm ">
      <div
        ref={popupRef}
        className="relative w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden"
        style={{
          top: `${popupTop}px`,
          left: `${popupLeft}px`,
          margin: 0,
          position: 'absolute',
        }}
      >
        {/* Botones de control */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido del diálogo */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold text-white">Confirmar eliminación</h2>
          </div>

          <p className="text-gray-400 mb-6">
            ¿Estás seguro que deseas eliminar el video{' '}
            <span className="text-white font-medium">"{title}"</span>? Esta acción no se
            puede deshacer.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
