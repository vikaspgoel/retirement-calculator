import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gita and Me | Wisdom for Your State of Mind',
  description: 'Discover contextual Bhagavad Gita wisdom based on your current state of mind.',
  openGraph: {
    title: 'Gita and Me | Wisdom for Your State of Mind',
    description: 'Discover contextual Bhagavad Gita wisdom based on your current state of mind.',
  },
}

export default function GitaPage() {
  return (
    <div className="w-full h-screen overflow-hidden bg-[#fbf7f0]">
       <iframe
         src="https://gita-and-you.vercel.app/"
         className="w-full h-full border-0"
         title="Gita and You"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
       />
    </div>
  )
}
