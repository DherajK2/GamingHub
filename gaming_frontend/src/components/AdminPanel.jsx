import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

function AdminPanel({ games, onAddGame, onEditGame, onDeleteGame, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '', category: '', price: '', duration: '', players: '',
    description: '', image: '', rating: '4.5', ageLimit: 'All'
  })
  const [editingId, setEditingId] = useState(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      if (isOpen) {
        gsap.to(panelRef.current, {
          x: 0,
          duration: 0.5,
          ease: "power3.out"
        })
      } else {
        gsap.to(panelRef.current, {
          x: '100%',
          duration: 0.5,
          ease: "power3.in"
        })
      }
    } else {
      panelRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)'
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const gameData = {
      ...formData,
      id: editingId || Date.now(),
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating)
    }
    
    if (editingId) {
      onEditGame(gameData)
    } else {
      onAddGame(gameData)
    }
    
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '', category: '', price: '', duration: '', players: '',
      description: '', image: '', rating: '4.5', ageLimit: 'All'
    })
    setEditingId(null)
  }

  const handleEdit = (game) => {
    setFormData({
      title: game.title,
      category: game.category,
      price: game.price.toString(),
      duration: game.duration,
      players: game.players,
      description: game.description,
      image: game.image,
      rating: game.rating.toString(),
      ageLimit: game.ageLimit
    })
    setEditingId(game.id)
  }

  const handleDelete = (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      onDeleteGame(gameId)
    }
  }

  const categories = ['Racing', 'Action', 'Puzzle', 'Simulation', 'Sports', 'Arcade', 'Music', 'Horror']
  const ageLimits = ['All', '8+', '10+', '12+', '14+', '16+', '18+']

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose} />
      <div
        ref={panelRef}
        className="fixed right-0 top-0 h-full w-full max-w-4xl bg-gray-900 shadow-2xl z-50 overflow-y-auto"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Game Form */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editingId ? 'Edit Game' : 'Add New Game'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 30 min"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Players</label>
                  <input
                    type="text"
                    value={formData.players}
                    onChange={(e) => setFormData(prev => ({ ...prev, players: e.target.value }))}
                    placeholder="e.g., 1-4"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age Limit</label>
                  <select
                    value={formData.ageLimit}
                    onChange={(e) => setFormData(prev => ({ ...prev, ageLimit: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {ageLimits.map(age => (
                      <option key={age} value={age}>{age}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  {editingId ? 'Update Game' : 'Add Game'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Games List */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Manage Games ({games.length})</h3>
            <div className="space-y-4">
              {games.map(game => (
                <div key={game.id} className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-4">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">{game.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{game.category}</span>
                      <span>${game.price}</span>
                      <span>{game.duration}</span>
                      <span>★ {game.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(game)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      aria-label={`Edit ${game.title}`}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      aria-label={`Delete ${game.title}`}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanel