'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

interface NoSSRProps {
  children: ReactNode
}

const NoSSR = ({ children }: NoSSRProps) => {
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Happy Birthday, Bhaiya</h1>
        <p className="text-gray-400">Loading your special surprise...</p>
      </div>
    </div>
  )
})
