// Images for full-width display
const images = [
  {
    id: 1,
    src: '/images/1.png',
    alt: 'Memory 1'
  },
  {
    id: 2,
    src: '/images/2.png',
    alt: 'Memory 2'
  },
  {
    id: 3,
    src: '/images/3.png',
    alt: 'Memory 3'
  },
  {
    id: 4,
    src: '/images/4.png',
    alt: 'Memory 4'
  }
]

// Video for cute box display
const video = {
  src: '/images/Untitled video - Made with Clipchamp (5).mp4',
  alt: 'Special Memory Video'
}

export default function PhotoGallery() {
  return (
    <div className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative pb-20">
      {/* Full-width images stacked with no gaps */}
      <div className="w-full">
        {images.map((image) => (
          <div key={image.id} className="w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto block"
              style={{ display: 'block' }}
            />
          </div>
        ))}
        
        {/* MP4 positioned with much less overlap for mobile */}
        {/* Responsive margin: much smaller on mobile, larger on desktop */}
        <div className="w-full relative" style={{ 
          marginTop: 'clamp(-200px, -15vw, -600px)' // Much less overlap: -200px on mobile, -600px on desktop
        }}>
          <div className="relative w-full p-3 md:p-6">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 md:border-8 border-white/90 backdrop-blur-sm">
              <video
                src="/images/Untitled video - Made with Clipchamp (5).mp4"
                className="w-full h-auto block rounded-xl md:rounded-2xl"
                autoPlay
                loop
                muted
                playsInline
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simple next button with better mobile positioning */}
      <div className="w-full text-center py-6 md:py-8 px-4">
        <button 
          onClick={() => {
            console.log('PhotoGallery button clicked, dispatching nextStep event');
            // Trigger the next step in the parent component
            const event = new CustomEvent('nextStep');
            window.dispatchEvent(event);
          }}
          className="p-3 md:p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-lg hover:shadow-orange-500/25"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  )
}