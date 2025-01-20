import type React from "react"
import { useState } from "react"
import { useApp } from "../context/AppContext"
import type { VideoFormData } from "../types"
import { Save, X, RefreshCw, Plus, Check } from "lucide-react"

interface VideoFormProps {
  initialData?: VideoFormData
  onSubmit: (data: VideoFormData) => void
  onCancel: () => void
}

export function VideoForm({ initialData, onSubmit, onCancel }: VideoFormProps) {
  const { categories, addCategory } = useApp()
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", color: "#6366f1" })
  const [formData, setFormData] = useState<VideoFormData>(
    initialData || {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      videoUrl: "",
    },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      videoUrl: "",
    })
  }

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      addCategory(newCategory)
      setIsAddingCategory(false)
      setNewCategory({ name: "", color: "#6366f1" })
    }
  }

  const selectedCategory = categories.find((c) => c.id === formData.category)

  return (
    <form onSubmit={handleSubmit} className="space-y-6  h-fit overflow-y-auto pr-2">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Título</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
            style={
              selectedCategory
                ? {
                    borderColor: `${selectedCategory.color}50`,
                    boxShadow: `0 0 10px ${selectedCategory.color}20`,
                  }
                : undefined
            }
            placeholder="Ingresa el título del video"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Categoría</label>
          <div className="relative">
            {!isAddingCategory ? (
              <div className="flex gap-2">
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
                  style={
                    selectedCategory
                      ? {
                          borderColor: `${selectedCategory.color}50`,
                          boxShadow: `0 0 10px ${selectedCategory.color}20`,
                        }
                      : undefined
                  }
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Nueva categoría"
                />
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={newCategory.color}
                    onChange={(e) => setNewCategory((prev) => ({ ...prev, color: e.target.value }))}
                    className="w-14 h-12 rounded-lg bg-gray-800/50 border border-gray-700 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL de la imagen</label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
            style={
              selectedCategory
                ? {
                    borderColor: `${selectedCategory.color}50`,
                    boxShadow: `0 0 10px ${selectedCategory.color}20`,
                  }
                : undefined
            }
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">URL del video</label>
          <input
            type="url"
            required
            value={formData.videoUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
            style={
              selectedCategory
                ? {
                    borderColor: `${selectedCategory.color}50`,
                    boxShadow: `0 0 10px ${selectedCategory.color}20`,
                  }
                : undefined
            }
            placeholder="https://ejemplo.com/video.mp4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Descripción</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 resize-y"
            style={{
              ...(selectedCategory
                ? {
                    borderColor: `${selectedCategory.color}50`,
                    boxShadow: `0 0 10px ${selectedCategory.color}20`,
                  }
                : {}),
              minHeight: "100px",
              maxHeight: "300px",
            }}
            placeholder="Describe el contenido del video..."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 sticky bottom-0 bg-gray-900 pb-4">
  <button
    type="button"
    onClick={handleReset}
    className="inline-flex flex-1 sm:flex-0.5 items-center px-4 py-2 text-sm justify-center font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
  >
    <RefreshCw className="h-4 w-4 mr-2" />
    Limpiar
  </button>
  <button
    type="button"
    onClick={onCancel}
    className="inline-flex flex-1 sm:flex-0.5 items-center px-4 py-2 text-sm justify-center font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
  >
    <X className="h-4 w-4 mr-2" />
    Cancelar
  </button>
  <button
    type="submit"
    className="inline-flex flex-1 sm:flex-0 items-center px-6 py-2 text-sm justify-center font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
    style={
      selectedCategory
        ? {
            backgroundColor: selectedCategory.color,
            boxShadow: `0 0 20px ${selectedCategory.color}40`,
          }
        : undefined
    }
  >
    <Save className="h-4 w-4 mr-2" />
    Guardar
  </button>
</div>

    </form>
  )
}

