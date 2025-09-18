import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Navigation() {
  const location = useLocation()
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
  }, [])

  return (
    <nav ref={navRef} className="bg-black/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Gaming Hub
            </h1>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Browse Games
              </Link>
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg transition-all ${
                  location.pathname === '/admin' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Admin Panel
              </Link>
            </div>
          </div>
          <div className="flex md:hidden">
            <Link to="/" className="p-2 text-gray-300 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation