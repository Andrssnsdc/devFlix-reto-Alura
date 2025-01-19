import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

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
  title
}: AlertDialogProps) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-gray-900 rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-lg font-semibold text-white">
              Confirmar eliminación
            </h2>
          </div>

          <p className="text-gray-400 mb-6">
            ¿Estás seguro que deseas eliminar el video <span className="text-white font-medium">"{title}"</span>? 
            Esta acción no se puede deshacer.
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