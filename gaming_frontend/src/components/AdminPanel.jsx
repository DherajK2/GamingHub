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