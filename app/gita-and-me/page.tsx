'use client'

import { useState, useEffect } from 'react'

export default function GitaPage() {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set a timeout to detect if iframe fails to load
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const handleIframeError = () => {
    setIframeError(true)
    setIsLoading(false)
  }

  if (iframeError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#fbf7f0]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Gita and Me</h1>
          <p className="text-gray-600 mb-4">Unable to load the Gita application at this time.</p>
          <button
            onClick={() => {
              setIframeError(false)
              setIsLoading(true)
            }}
            className="px-4 py-2 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-[#fbf7f0] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#fbf7f0] z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Gita and Me...</p>
          </div>
        </div>
      )}
      <iframe
        src="https://gita-and-you.vercel.app/"
        className="w-full h-full border-0"
        title="Gita and You"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setIsLoading(false)}
        onError={handleIframeError}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  )
}
