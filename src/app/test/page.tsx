'use client'

import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text mb-8">
          Happy Birthday, Bhaiya
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          This is a simple test page to verify everything is working correctly.
        </p>
        <div className="space-y-4">
          <div className="bg-white/10 p-4 rounded-lg">
            <p className="text-white">✅ CSS classes working</p>
          </div>
          <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-500/50">
            <p className="text-orange-400">✅ Colors and gradients working</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-300">✅ Standard Tailwind classes working</p>
          </div>
        </div>
        <Link 
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Go to Main Page
        </Link>
      </div>
    </div>
  )
}
