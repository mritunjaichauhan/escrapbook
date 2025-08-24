'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import PhotoGallery from '@/components/PhotoGallery'
import BirthdayLetter from '@/components/BirthdayLetter'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [typedComplete, setTypedComplete] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Background music effect
  useEffect(() => {
    if (!mounted) return

    const audio = new Audio('/images/Sparks-Coldplay.ogg')
    audio.loop = true
    audio.volume = 0.3 // Set to 30% volume for background music
    
    // Try to play the audio
    const playAudio = async () => {
      try {
        await audio.play()
      } catch (error) {
        // If autoplay is blocked, we'll need user interaction
        console.log('Autoplay prevented, will play after user interaction')
      }
    }

    playAudio()

    // Cleanup function
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    // Show welcome text immediately with fade-in animation
    const timer = setTimeout(() => {
      setTypedComplete(true)
      setTimeout(() => setShowContent(true), 2500) // Wait for all text to fade in
    }, 500)

    return () => clearTimeout(timer)
  }, [mounted])

  // Listen for next step event from PhotoGallery
  useEffect(() => {
    const handleNextStep = () => {
      console.log('Next step event received, current step:', currentStep)
      if (currentStep === 1) { // If we're on the gallery step
        setCurrentStep(2) // Go to letter step
      }
    }

    window.addEventListener('nextStep', handleNextStep)
    return () => window.removeEventListener('nextStep', handleNextStep)
  }, [currentStep])

  // Auto-scroll to top when step changes
  useEffect(() => {
    if (currentStep > 0) { // Don't scroll on intro step
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const handleNext = async () => {
    console.log('handleNext called, currentStep:', currentStep, 'steps.length:', steps.length)
    if (currentStep === 0) {
      // Ensure background music starts playing after user interaction
      try {
        const audio = document.querySelector('audio') as HTMLAudioElement
        if (audio && audio.paused) {
          await audio.play()
        }
      } catch (error) {
        console.log('Could not start background music:', error)
      }
    }
    const newStep = Math.min(currentStep + 1, steps.length - 1)
    console.log('Setting currentStep to:', newStep)
    setCurrentStep(newStep)
  }

  const handlePrevious = () => {
    console.log('handlePrevious called, currentStep:', currentStep)
    const newStep = Math.max(currentStep - 1, 0)
    console.log('Setting currentStep to:', newStep)
    setCurrentStep(newStep)
  }

  const steps = [
    { 
      id: 'intro', 
      title: 'Welcome',
      component: () => null // We'll handle intro separately
    },
    { 
      id: 'gallery', 
      title: 'Photo Memories',
      subtitle: 'A collection of precious moments and memories',
      component: PhotoGallery 
    },
    { 
      id: 'letter', 
      title: 'Birthday Letter',
      subtitle: 'A special message just for you',
      component: BirthdayLetter 
    },
  ]

  const currentStepData = steps[currentStep]

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Happy Birthday, Bhaiya</h1>
          <p className="text-gray-400">Loading your special surprise...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Background music */}
      <audio 
        src="/images/Sparks-Coldplay.ogg" 
        loop 
        autoPlay 
        style={{ display: 'none' }}
        ref={(audio) => {
          if (audio) {
            audio.volume = 0.3
          }
        }}
      />
      <ParticleBackground />
      
      <AnimatePresence mode="wait">
        {currentStep === 0 ? (
          // Welcome/Intro Step
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-7xl font-display text-gradient mb-6"
                >
                  Happy Birthday, Bhaiya
                </motion.h1>
                
                                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                      className="text-xl md:text-2xl text-muted-foreground font-handwriting mb-4"
                    >
                      This is for you...
                    </motion.p>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                      className="text-xl md:text-2xl text-muted-foreground font-handwriting"
                    >
                      A collection of memories from someone who cares. Click below to begin
                    </motion.p>
              </motion.div>
              
              <AnimatePresence>
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-12"
                  >
                    <p className="text-lg md:text-xl text-muted-foreground mb-8 font-poppins">
                      No pressure at all—just wanted you to feel a little warmth today.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="group relative px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2 font-poppins text-xl">
                        come in
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          // Step-by-step content
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col"
          >
            {/* Warm Header */}
            <div className="flex-shrink-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-50 relative overflow-hidden">
              <div className="relative max-w-5xl mx-auto px-6 py-8">
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {currentStepData.subtitle && (
                      <p className="text-2xl text-orange-600 font-poppins opacity-80">
                        A collection of precious moments and memories
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>
              
              {/* Soft bottom border */}
              <div className="h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>
            </div>

            {/* Step Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full pb-8 md:pb-12"
              >
                {currentStepData.component && <currentStepData.component />}
              </motion.div>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}