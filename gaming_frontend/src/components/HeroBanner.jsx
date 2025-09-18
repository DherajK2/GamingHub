import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function HeroBanner() {
  const bannerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      const tl = gsap.timeline()
      
      tl.fromTo(bannerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
    }
  }, [])

  return (
    <div ref={bannerRef} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-12 mb-12">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center">
        <h2 ref={titleRef} className="text-5xl font-bold mb-4 text-white">
          Welcome to Gaming Paradise
        </h2>
        <p ref={subtitleRef} className="text-xl text-white/90 max-w-2xl mx-auto">
          Experience the ultimate gaming destination with VR, arcade classics, and immersive adventures
        </p>
      </div>
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    </div>
  )
}

export default HeroBanner