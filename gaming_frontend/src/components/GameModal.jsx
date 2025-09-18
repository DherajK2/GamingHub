import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function GameModal({ game, onClose, onBook }) {
  const modalRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      gsap.fromTo(contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      )
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose
      })
    } else {
      onClose()
    }
  }

  if (!game) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={contentRef}
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <h2 id="modal-title" className="text-3xl font-bold text-white mb-2">{game.title}</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-purple-600/30 text-purple-300 rounded-full text-sm">
              {game.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white">{game.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{game.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">Duration</span>
              <p className="text-white font-semibold">{game.duration}</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">Players</span>
              <p className="text-white font-semibold">{game.players}</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">Age Limit</span>
              <p className="text-white font-semibold">{game.ageLimit}</p>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <span className="text-gray-400 text-sm">Price</span>
              <p className="text-white font-semibold text-xl">${game.price}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => onBook(game)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              Book Now
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameModal