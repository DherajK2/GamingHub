import { useState, useRef, useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import GameCard from '../components/GameCard'
import GameModal from '../components/GameModal'
import initialGames from '../data/games.json'
import gsap from 'gsap'

function UserPage() {
  const [games, setGames] = useState(initialGames.games)
  const [filteredGames, setFilteredGames] = useState(initialGames.games)
  const [selectedGame, setSelectedGame] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 50])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [bookings, setBookings] = useState([])
  const [showBookingSuccess, setShowBookingSuccess] = useState(false)
  
  const filtersRef = useRef(null)
  const gamesGridRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.fromTo(filtersRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      )
      gsap.fromTo(gamesGridRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
      )
    }
  }, [])

  // Get unique categories
  const categories = ['All', ...new Set(games.map(game => game.category))]

  // Filter and sort games
  useEffect(() => {
    let filtered = games.filter(game => {
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory
      const matchesPrice = game.price >= priceRange[0] && game.price <= priceRange[1]
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesCategory && matchesPrice && matchesSearch
    })

    // Sort games
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredGames(filtered)
  }, [games, selectedCategory, priceRange, searchTerm, sortBy])

  const handleBookGame = (game) => {
    const booking = {
      id: Date.now(),
      game: game,
      bookingTime: new Date().toISOString(),
      status: 'confirmed'
    }
    setBookings(prev => [...prev, booking])
    setSelectedGame(null)
    setShowBookingSuccess(true)
    setTimeout(() => setShowBookingSuccess(false), 3000)
  }

  const handleClearFilters = () => {
    setSelectedCategory('All')
    setPriceRange([0, 50])
    setSearchTerm('')
    setSortBy('rating')
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Booking Success Notification */}
        {showBookingSuccess && (
          <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Booking confirmed! Have fun gaming!
            </div>
          </div>
        )}

        {/* My Bookings Summary */}
        {bookings.length > 0 && (
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 mb-8 border border-green-500/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              My Bookings ({bookings.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookings.slice(-3).map(booking => (
                <div key={booking.id} className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-3">
                  <img 
                    src={booking.game.image} 
                    alt={booking.game.title}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm">{booking.game.title}</h4>
                    <p className="text-xs text-gray-400">${booking.game.price} • {booking.game.duration}</p>
                  </div>
                  <span className="text-xs bg-green-600/30 text-green-300 px-2 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div ref={filtersRef} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Games</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="flex-1"
                />
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="rating">Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                  title="Clear all filters"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
          </h2>
          <div className="text-gray-400">
            {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Games Grid */}
        <div ref={gamesGridRef}>
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={setSelectedGame}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters to find more games</p>
              <button
                onClick={handleClearFilters}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 text-center border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {categories.length - 1}
            </div>
            <div className="text-gray-300">Game Categories</div>
          </div>
          <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl p-6 text-center border border-pink-500/20">
            <div className="text-3xl font-bold text-pink-400 mb-2">
              {Math.round(games.reduce((sum, game) => sum + game.rating, 0) / games.length * 10) / 10}
            </div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-xl p-6 text-center border border-blue-500/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {bookings.length}
            </div>
            <div className="text-gray-300">Your Bookings</div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onBook={handleBookGame}
        />
      )}
    </div>
  )
}

export default UserPage