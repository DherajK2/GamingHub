import { useState, useRef, useEffect } from 'react'
import AdminPanel from '../components/AdminPanel'
import GameCard from '../components/GameCard'
import GameModal from '../components/GameModal'
import initialGames from '../data/games.json'
import gsap from 'gsap'

function AdminPage() {
  const [games, setGames] = useState(initialGames.games)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [stats, setStats] = useState({
    totalGames: 0,
    totalRevenue: 0,
    avgRating: 0,
    categories: {}
  })
  const headerRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    // Calculate stats
    const totalGames = games.length
    const totalRevenue = games.reduce((sum, game) => sum + game.price, 0)
    const avgRating = games.reduce((sum, game) => sum + game.rating, 0) / games.length
    const categories = games.reduce((acc, game) => {
      acc[game.category] = (acc[game.category] || 0) + 1
      return acc
    }, {})

    setStats({ totalGames, totalRevenue, avgRating, categories })
  }, [games])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
      )
    }
  }, [])

  const handleAddGame = (newGame) => {
    setGames(prev => [...prev, newGame])
  }

  const handleEditGame = (updatedGame) => {
    setGames(prev => prev.map(game => 
      game.id === updatedGame.id ? updatedGame : game
    ))
  }

  const handleDeleteGame = (gameId) => {
    setGames(prev => prev.filter(game => game.id !== gameId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gaming Hub Admin
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Manage your gaming experiences and monitor performance
          </p>
          
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Manage Games
          </button>
        </div>

        {/* Stats Dashboard */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600/30 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-sm text-purple-300 font-medium">Total Games</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalGames}</div>
          </div>

          <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-pink-600/30 rounded-lg">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <span className="text-sm text-pink-300 font-medium">Total Value</span>
            </div>
            <div className="text-3xl font-bold text-white">${stats.totalRevenue.toFixed(0)}</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-600/30 rounded-lg">
                <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-yellow-300 font-medium">Avg Rating</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.avgRating.toFixed(1)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-600/30 rounded-lg">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <span className="text-sm text-green-300 font-medium">Categories</span>
            </div>
            <div className="text-3xl font-bold text-white">{Object.keys(stats.categories).length}</div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-12 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Games by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{count}</div>
                <div className="text-sm text-gray-300">{category}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">All Games</h2>
            <div className="text-gray-400">
              {games.length} game{games.length !== 1 ? 's' : ''} available
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={setSelectedGame}
                index={index}
              />
            ))}
          </div>

          {games.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Games Available</h3>
              <p className="text-gray-400 mb-6">Start by adding your first gaming experience!</p>
              <button
                onClick={() => setIsAdminPanelOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Add Game
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel
        games={games}
        onAddGame={handleAddGame}
        onEditGame={handleEditGame}
        onDeleteGame={handleDeleteGame}
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onBook={(game) => {
            console.log('Booking game:', game)
            setSelectedGame(null)
            // Add booking logic here
          }}
        />
      )}
    </div>
  )
}

export default AdminPage