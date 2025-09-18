import { useRef, useEffect } from 'react'
import gsap from 'gsap'

function GameCard({ game, onClick, index }) {
  const cardRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "power3.out" 
        }
      )

      const card = cardRef.current
      const handleMouseEnter = () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" })
        gsap.to(imageRef.current, { scale: 1.1, duration: 0.3, ease: "power2.out" })
      }
      const handleMouseLeave = () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" })
        gsap.to(imageRef.current, { scale: 1, duration: 0.3, ease: "power2.out" })
      }

      card.addEventListener('mouseenter', handleMouseEnter)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(game)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl hover:shadow-purple-500/20 border border-white/10"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(game)}
      aria-label={`View details for ${game.title}`}
    >
      <div className="aspect-video overflow-hidden bg-gray-900">
        <img
          ref={imageRef}
          src={game.image}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white">{game.title}</h3>
          <span className="text-sm px-2 py-1 bg-purple-600/30 text-purple-300 rounded-full">
            {game.category}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {game.rating}
          </span>
          <span>{game.duration}</span>
          <span>{game.players} players</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${game.price}</span>
          <span className="text-xs text-gray-500">Age: {game.ageLimit}</span>
        </div>
      </div>
    </div>
  )
}

export default GameCard