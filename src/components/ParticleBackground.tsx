'use client'

import { useEffect } from 'react'

export default function ParticleBackground() {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * window.innerWidth + 'px'
      particle.style.animationDelay = Math.random() * 15 + 's'
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's'
      
      const container = document.getElementById('particle-container')
      if (container) {
        container.appendChild(particle)
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove()
        }, 25000)
      }
    }
    
    // Create initial particles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createParticle(), i * 300)
    }
    
    // Continue creating particles
    const interval = setInterval(createParticle, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return <div id="particle-container" className="particles" />
}


