'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Shuffle, Repeat } from 'lucide-react'

// Add your brother's favorite songs here
const playlist = [
  {
    id: 1,
    title: "Time After Time",
    artist: "Cyndi Lauper",
    memory: "This always played in dad&apos;s car during our road trips",
    duration: "3:45",
    // You'll need to add actual audio files in the public folder
    src: "/audio/song1.mp3",
    color: "#f97316"
  },
  {
    id: 2,
    title: "Don&apos;t Stop Believin&apos;",
    artist: "Journey",
    memory: "Our karaoke anthem - you always nailed the high notes!",
    duration: "4:11",
    src: "/audio/song2.mp3",
    color: "#059669"
  },
  {
    id: 3,
    title: "Brothers in Arms",
    artist: "Dire Straits",
    memory: "This one always reminds me of us",
    duration: "6:55",
    src: "/audio/song3.mp3",
    color: "#dc2626"
  },
  {
    id: 4,
    title: "The Scientist",
    artist: "Coldplay",
    memory: "You showed me this song in college - still love it",
    duration: "5:09",
    src: "/audio/song4.mp3",
    color: "#7c3aed"
  },
  {
    id: 5,
    title: "Count on Me",
    artist: "Bruno Mars",
    memory: "Because you can always count on me, brother",
    duration: "3:17",
    src: "/audio/song5.mp3",
    color: "#0891b2"
  }
]

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [likedSongs, setLikedSongs] = useState<Set<number>>(new Set())
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    const handleEnded = () => {
      handleNext()
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSong])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(err => {
        console.log("Playback failed:", err)
        // Handle autoplay restrictions
      })
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * playlist.length)
      setCurrentSong(randomIndex)
    } else {
      setCurrentSong((prev) => (prev + 1) % playlist.length)
    }
    setIsPlaying(false)
    setProgress(0)
  }

  const handlePrevious = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length)
    setIsPlaying(false)
    setProgress(0)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newProgress = Number(e.target.value)
    setProgress(newProgress)
    audio.currentTime = (audio.duration * newProgress) / 100
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = Number(e.target.value)
    setVolume(newVolume)
    audio.volume = newVolume
  }

  const handleLike = (songId: number) => {
    setLikedSongs(prev => {
      const newLikes = new Set(prev)
      if (newLikes.has(songId)) {
        newLikes.delete(songId)
      } else {
        newLikes.add(songId)
      }
      return newLikes
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentAudio = audioRef.current
  const currentTime = currentAudio ? currentAudio.currentTime : 0
  const duration = currentAudio ? currentAudio.duration : 0

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display text-gradient mb-2">
          songs that feel like home
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-handwriting">
          press play if you want. no rush.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Current song display */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper rounded-xl p-8 mb-8 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${playlist[currentSong].color}10 0%, rgba(255, 255, 255, 0.9) 100%)`
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${playlist[currentSong].color}40 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${playlist[currentSong].color}30 0%, transparent 50%)`
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-1">
                  {playlist[currentSong].title}
                </h3>
                <p className="text-muted-foreground">{playlist[currentSong].artist}</p>
              </div>
              <button
                onClick={() => handleLike(playlist[currentSong].id)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    likedSongs.has(playlist[currentSong].id)
                      ? 'fill-orange-400 text-orange-400 scale-110'
                      : 'text-white/70'
                  }`}
                />
              </button>
            </div>

            <p className="text-orange-400 mb-6 italic">
              &ldquo;{playlist[currentSong].memory}&rdquo;
            </p>

            {/* Progress bar */}
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${playlist[currentSong].color} 0%, ${playlist[currentSong].color} ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setShuffle(!shuffle)}
                className={`p-2 rounded-full transition-colors ${
                  shuffle ? 'bg-orange-500 text-white' : 'hover:bg-white/10'
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </button>
              
              <button
                onClick={handlePrevious}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <SkipBack className="w-6 h-6" />
              </button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlayPause}
                className="p-4 bg-orange-500 hover:bg-orange-600 rounded-full transition-colors shadow-lg shadow-orange-500/25"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </motion.button>
              
              <button
                onClick={handleNext}
                className="p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <SkipForward className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setRepeat(!repeat)}
                className={`p-2 rounded-full transition-colors ${
                  repeat ? 'bg-orange-500 text-white' : 'hover:bg-white/10'
                }`}
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-white/70" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, ${playlist[currentSong].color} 0%, ${playlist[currentSong].color} ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h4 className="text-lg font-semibold mb-4">Playlist</h4>
          {playlist.map((song, index) => (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                setCurrentSong(index)
                setIsPlaying(false)
                setProgress(0)
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all group relative overflow-hidden ${
                currentSong === index
                  ? 'bg-orange-500/20 border border-orange-500/50'
                  : 'bg-white border border-gray-200 hover:bg-orange-50'
              }`}
            >
              {/* Song background */}
              <div 
                className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: song.color }}
              />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${song.color}30` }}
                  >
                    {currentSong === index && isPlaying ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Pause className="w-5 h-5" style={{ color: song.color }} />
                      </motion.div>
                    ) : (
                      <Play className="w-5 h-5" style={{ color: song.color }} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {song.duration}
                  </span>
                  {likedSongs.has(song.id) && (
                    <Heart className="w-4 h-4 fill-orange-400 text-orange-400" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={playlist[currentSong].src}
        preload="metadata"
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: ${playlist[currentSong].color};
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px ${playlist[currentSong].color}50;
        }
      `}</style>
    </div>
  )
}