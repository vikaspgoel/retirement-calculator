'use client'

import { useState, useEffect, useRef } from 'react'

export default function GitaPage() {
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const loadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Set a shorter timeout - if it doesn't load in 3 seconds, show error
    loadTimeoutRef.current = setTimeout(() => {
      if (isLoading) {
        setIframeError(true)
        setIsLoading(false)
      }
    }, 3000)

    // Also check periodically if iframe has content
    checkIntervalRef.current = setInterval(() => {
      try {
        const iframe = iframeRef.current
        if (iframe && iframe.contentWindow) {
          // Try to access iframe content (will fail if cross-origin, but that's ok)
          // If we can't access it, assume it's loading or loaded
          const hasContent = iframe.contentDocument?.body?.innerHTML
          if (hasContent && hasContent.length > 100) {
            setIsLoading(false)
            if (checkIntervalRef.current) {
              clearInterval(checkIntervalRef.current)
            }
          }
        }
      } catch (e) {
        // Cross-origin error is expected - iframe might be loading
      }
    }, 500)

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
    }
  }, [isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current)
    if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
  }

  const handleRetry = () => {
    setIframeError(false)
    setIsLoading(true)
    // Force iframe reload
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
  }

  if (iframeError) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#fbf7f0]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Gita and Me</h1>
          <p className="text-gray-600 mb-4">Unable to load the Gita application at this time.</p>
          <p className="text-sm text-gray-500 mb-4">The external service may be temporarily unavailable.</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-saffron-500 text-white rounded-lg hover:bg-saffron-600 transition-colors"
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
        ref={iframeRef}
        src="https://gita-and-you.vercel.app/"
        className="w-full h-full border-0"
        title="Gita and You"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={handleIframeLoad}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}
      />
    </div>
  )
}
