'use client'

import { motion } from 'framer-motion'

export default function BirthdayLetter() {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 pt-8 pb-20">
      <div className="max-w-3xl w-full mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-orange-200/50"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-6 text-gray-800 text-lg leading-relaxed"
          >
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-2xl text-gray-900 font-handwriting"
            >
              My Dearest Vasu Bhaiya,
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Another year, another birthday—and even though you&apos;re far away, what I feel most today is how lucky I am to have you as my brother.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              To me, you&apos;ve always been more than just a brother. You were my anchor, my guide, and often my voice when I couldn&apos;t speak for myself. I still remember how you&apos;d step in with Mumma and Papa, making sense of things I couldn&apos;t explain. From you, I&apos;ve learned what real support and quiet strength look like. And I want you to know—you can always lean on me, just like I leaned on you.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Birthdays always bring back memories. I think of those calls you made from college, how they kept us close even when you were away. And of course, I remember our Hot Wheels matches—how serious we made them, and how the loser had to dance to Gangnam Style. Those moments are still some of my favorites, and they always make me smile.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              These memories remind me of the bond we share, one that no distance can ever weaken. I miss you, and I&apos;m already looking forward to the day you&apos;re home so we can make new memories together.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-gray-900 font-handwriting"
            >
              Happy Birthday, Bhaiya. I hope this year brings you happiness, strength, and all the success you deserve.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600">With all my love,</p>
              <p className="text-gray-700 text-xl mt-2 font-handwriting">gunnu</p>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="mt-4 text-4xl"
              >
                💝
              </motion.div>
            </motion.div>
            
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}