'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Heart, Star, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// TypeScript interfaces to replace 'any' types
interface TicketDetails {
  from: string
  to: string
  date: string
  price: string
}

interface ReceiptDetails {
  item: string
  occasion: string
  value: string
  date: string
}

interface Memory {
  id: number
  type: 'ticket' | 'receipt' | 'note' | 'photo'
  title: string
  description: string
  year: number
  month?: string
  rotation: number
  location?: string
  image?: string
  sticker?: string
  emotion?: string
  ticketDetails?: TicketDetails
  receiptDetails?: ReceiptDetails
}

// Scrapbook style memories with tickets and receipts
const memories: Memory[] = [
  {
    id: 1,
    year: 2005,
    title: 'Our First Adventure',
    description: 'Remember when we built that treehouse in the backyard? You insisted on painting it blue, and we spent the whole summer up there.',
    location: 'Old House',
    emotion: 'Joy',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23059669;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%2310b981;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad1)"/%3E%3Ctext x="50%" y="45%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3ETreehouse%3C/text%3E%3Ctext x="50%" y="60%" font-family="Arial" font-size="18" fill="%23e5e7eb" text-anchor="middle" dy=".3em"%3E2005%3C/text%3E%3C/svg%3E',
    type: 'photo',
    sticker: '🏠',
    rotation: 2
  },
  {
    id: 2,
    year: 2010,
    title: 'The Great Road Trip',
    description: 'That spontaneous trip to the mountains. We got lost, but ended up finding the most beautiful sunset spot.',
    location: 'Colorado Mountains',
    emotion: 'Adventure',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23dc2626;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f97316;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad2)"/%3E%3Ctext x="50%" y="45%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3ERoad Trip%3C/text%3E%3Ctext x="50%" y="60%" font-family="Arial" font-size="18" fill="%23fed7aa" text-anchor="middle" dy=".3em"%3E2010%3C/text%3E%3C/svg%3E',
    type: 'ticket',
    sticker: '🚗',
    rotation: -1,
    ticketDetails: {
      from: 'Home',
      to: 'Colorado Mountains',
      date: 'July 15, 2010',
      price: '$45.00'
    }
  },
  {
    id: 3,
    year: 2015,
    title: 'Graduation Day',
    description: 'I was so proud watching you walk across that stage. You\'ve always been destined for great things.',
    location: 'University Campus',
    emotion: 'Pride',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%237c3aed;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23a855f7;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad3)"/%3E%3Ctext x="50%" y="45%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3EGraduation%3C/text%3E%3Ctext x="50%" y="60%" font-family="Arial" font-size="18" fill="%23e9d5ff" text-anchor="middle" dy=".3em"%3E2015%3C/text%3E%3C/svg%3E',
    type: 'photo',
    sticker: '🎓',
    rotation: 3
  },
  {
    id: 4,
    year: 2018,
    title: 'The Wedding',
    description: 'Your best man speech still makes me laugh. "May your love be modern enough to survive the times, but old-fashioned enough to last forever."',
    location: 'Hometown',
    emotion: 'Love',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23e11d48;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23f43f5e;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad4)"/%3E%3Ctext x="50%" y="45%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3EWedding Day%3C/text%3E%3Ctext x="50%" y="60%" font-family="Arial" font-size="18" fill="%23fecdd3" text-anchor="middle" dy=".3em"%3E2018%3C/text%3E%3C/svg%3E',
    type: 'receipt',
    sticker: '💒',
    rotation: -2,
    receiptDetails: {
      item: 'Best Man Speech',
      occasion: 'Wedding Ceremony',
      value: 'Priceless',
      date: 'June 12, 2018'
    }
  },
  {
    id: 5,
    year: 2020,
    title: 'Pandemic Gaming Sessions',
    description: 'When the world stopped, we found each other online. Those late-night gaming sessions kept us connected.',
    location: 'Virtual',
    emotion: 'Connection',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%230891b2;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%230ea5e9;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad5)"/%3E%3Ctext x="50%" y="45%" font-family="Arial" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3EGaming%3C/text%3E%3Ctext x="50%" y="60%" font-family="Arial" font-size="18" fill="%23bae6fd" text-anchor="middle" dy=".3em"%3E2020%3C/text%3E%3C/svg%3E',
    type: 'photo',
    sticker: '🎮',
    rotation: 1
  }
]

// Ticket component
const Ticket = ({ memory }: { memory: Memory }) => (
  <div 
    className="bg-blue-50 border-2 border-dashed border-blue-300 p-4 rounded-lg relative"
    style={{ transform: `rotate(${memory.rotation}deg)` }}
  >
    <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-200 rounded-full"></div>
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-200 rounded-full"></div>
    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-200 rounded-full"></div>
    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-200 rounded-full"></div>
    
    <div className="text-center">
      <div className="text-lg font-bold text-blue-800 mb-2">{memory.title}</div>
      <div className="text-sm text-blue-600 space-y-1">
        <div>FROM: {memory.ticketDetails?.from}</div>
        <div>TO: {memory.ticketDetails?.to}</div>
        <div>DATE: {memory.ticketDetails?.date}</div>
        <div>PRICE: {memory.ticketDetails?.price}</div>
      </div>
    </div>
  </div>
)

// Receipt component
const Receipt = ({ memory }: { memory: Memory }) => (
  <div 
    className="bg-white border border-gray-300 p-4 shadow-lg relative"
    style={{ 
      transform: `rotate(${memory.rotation}deg)`,
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 21px)'
    }}
  >
    <div className="text-center border-b border-gray-200 pb-2 mb-3">
      <div className="font-mono text-sm">*** MEMORY RECEIPT ***</div>
      <div className="font-mono text-xs">SIBLING ADVENTURES CO.</div>
    </div>
    
    <div className="font-mono text-xs space-y-1">
      <div className="flex justify-between">
        <span>ITEM:</span>
        <span>{memory.receiptDetails?.item}</span>
      </div>
      <div className="flex justify-between">
        <span>OCCASION:</span>
        <span>{memory.receiptDetails?.occasion}</span>
      </div>
      <div className="flex justify-between">
        <span>VALUE:</span>
        <span>{memory.receiptDetails?.value}</span>
      </div>
      <div className="border-t border-gray-300 pt-1 mt-2">
        <div className="flex justify-between font-bold">
          <span>DATE:</span>
          <span>{memory.receiptDetails?.date}</span>
        </div>
      </div>
    </div>
    
    <div className="text-center mt-3 pt-2 border-t border-gray-200">
      <div className="font-mono text-xs">THANK YOU FOR THE MEMORY!</div>
    </div>
  </div>
)

export default function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  
  return (
    <div className="py-12 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display text-gradient mb-2 font-handwriting">
          moments we collected ✨
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-handwriting">
          little pieces of us, scattered through time...
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Scrapbook scattered layout */}
        <div className="space-y-16 md:space-y-24">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className={`relative flex flex-col md:flex-row items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Year badge - like a sticker */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute top-0 left-0 z-10 bg-orange-400 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg"
                style={{ transform: `rotate(${memory.rotation * 2}deg)` }}
              >
                {memory.year}
              </motion.div>

              {/* Memory content */}
              <div className="flex-1 md:max-w-md">
                {memory.type === 'photo' && memory.image && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.2 }}
                    className="relative"
                    style={{ transform: `rotate(${memory.rotation}deg)` }}
                  >
                    {/* Polaroid style */}
                    <div className="bg-white p-4 pb-16 shadow-xl border border-gray-200">
                      <Image
                        src={memory.image}
                        alt={memory.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-handwriting text-lg text-gray-700 text-center">
                          {memory.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Sticker */}
                    {memory.sticker && (
                      <div 
                        className="absolute -top-2 -right-2 text-3xl"
                        style={{ transform: 'rotate(15deg)' }}
                      >
                        {memory.sticker}
                      </div>
                    )}
                    
                    {/* Tape effect */}
                    <div 
                      className="absolute -top-3 left-1/4 w-16 h-6 bg-yellow-200 opacity-70 rounded-sm"
                      style={{ 
                        background: 'repeating-linear-gradient(45deg, rgba(253, 224, 71, 0.8), rgba(253, 224, 71, 0.8) 8px, rgba(255,255,255,0.6) 8px, rgba(255,255,255,0.6) 16px)'
                      }}
                    />
                  </motion.div>
                )}

                {memory.type === 'ticket' && (
                  <Ticket memory={memory} />
                )}

                {memory.type === 'receipt' && (
                  <Receipt memory={memory} />
                )}
              </div>

              {/* Memory text - like handwritten notes */}
              <div className="flex-1 space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 + 0.3 }}
                  className="paper p-6 rounded-lg relative"
                  style={{ transform: `rotate(${memory.rotation * -0.5}deg)` }}
                >
                  <div className="absolute top-2 right-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  
                  <h3 className="font-handwriting text-2xl text-gray-800 mb-3">
                    {memory.title}
                  </h3>
                  
                  <p className="font-handwriting text-lg text-gray-700 mb-4 leading-relaxed">
                    {memory.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    {memory.location && (
                      <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-handwriting">{memory.location}</span>
                      </span>
                    )}
                    {memory.emotion && (
                      <span className="flex items-center gap-1 bg-pink-100 px-3 py-1 rounded-full">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="font-handwriting">{memory.emotion}</span>
                      </span>
                    )}
                  </div>

                  {/* Paper texture lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-full h-px bg-blue-200 absolute"
                        style={{ top: `${20 + i * 15}%` }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Scattered decorative elements */}
                {index % 3 === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.3 + 0.8 }}
                    className="absolute -bottom-4 -right-4 text-3xl"
                    style={{ transform: `rotate(${Math.random() * 40 - 20}deg)` }}
                  >
                    ✨
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scattered background decorations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-32 right-8 text-4xl"
          style={{ transform: 'rotate(25deg)' }}
        >
          📚
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-24 left-4 text-3xl"
          style={{ transform: 'rotate(-15deg)' }}
        >
          💝
        </motion.div>
      </div>

      {/* Interactive hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="text-center mt-16"
      >
        <p className="text-sm text-gray-500 font-handwriting">
          hover over the memories to see them come alive
        </p>
      </motion.div>
    </div>
  )
}