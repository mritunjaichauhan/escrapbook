'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mic, Play, Pause, Trash2, Clock } from 'lucide-react'

interface VoiceMessage {
  id: number
  duration: string
  timestamp: string
  title: string
  isPlaying: boolean
}

export default function VoiceMessages() {
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 1,
      duration: "0:45",
      timestamp: "Recorded with love",
      title: "Happy Birthday Message",
      isPlaying: false
    },
    {
      id: 2,
      duration: "1:23",
      timestamp: "A memory to share",
      title: "Remember Our First Concert?",
      isPlaying: false
    },
    {
      id: 3,
      duration: "0:38",
      timestamp: "Just for you",
      title: "You've Always Been There",
      isPlaying: false
    }
  ])
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [newMessage, setNewMessage] = useState('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      // Add new message
      const newMsg: VoiceMessage = {
        id: messages.length + 1,
        duration: formatTime(recordingTime),
        timestamp: "Just now",
        title: newMessage || "New Voice Message",
        isPlaying: false
      }
      
      setMessages([...messages, newMsg])
      setRecordingTime(0)
      setNewMessage('')
    } else {
      // Start recording
      setIsRecording(true)
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlay = (id: number) => {
    setMessages(messages.map(msg => ({
      ...msg,
      isPlaying: msg.id === id ? !msg.isPlaying : false
    })))
  }

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display text-gradient mb-4">
          Voice Notes
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Some things are better said than written. Here are some messages from the heart.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Existing messages */}
        <div className="space-y-4 mb-12">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{message.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {message.duration}
                    </span>
                    <span>{message.timestamp}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePlay(message.id)}
                    className="p-3 bg-orange-500 hover:bg-orange-600 rounded-full transition-colors shadow-lg shadow-orange-500/25"
                  >
                    {message.isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </motion.button>
                  
                  {message.id > 3 && (
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-3 hover:bg-white/10 rounded-full transition-colors text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Visual waveform placeholder */}
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-orange-500/30 rounded-full transition-all duration-300"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      opacity: message.isPlaying ? 1 : 0.5,
                      transform: message.isPlaying ? 'scaleY(1.2)' : 'scaleY(1)'
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Record new message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6">Leave Your Own Message</h3>
          
          {!isRecording && (
            <input
              type="text"
              placeholder="Give your message a title..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full mb-6 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
            />
          )}
          
          <div className="flex flex-col items-center">
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 text-center"
              >
                <p className="text-2xl font-mono text-orange-400 mb-2">
                  {formatTime(recordingTime)}
                </p>
                <p className="text-sm text-gray-400">Recording...</p>
                
                {/* Recording animation */}
                <div className="mt-4 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-orange-500 rounded-full"
                      animate={{
                        height: [10, 30, 10],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRecord}
              className={`p-6 rounded-full transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25'
              }`}
            >
              <Mic className="w-8 h-8" />
            </motion.button>
            
            <p className="mt-4 text-sm text-gray-400">
              {isRecording ? 'Click to stop recording' : 'Click to start recording'}
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>💡 Tip: Record a personal message for your brother.</p>
          <p>Share a memory, tell him you care, or just say happy birthday!</p>
        </motion.div>
      </div>
    </div>
  )
}
