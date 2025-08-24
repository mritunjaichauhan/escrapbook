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
    <div className="w-full bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative">
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
        {/* MP4 positioned to overlap the empty space in the last image */}
        <div className="w-full relative" style={{ marginTop: '-800px' }}>
          <div className="relative w-full p-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-8 border-white/90 backdrop-blur-sm">
              <video
                src="/images/Untitled video - Made with Clipchamp (5).mp4"
                className="w-full h-auto block rounded-2xl"
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



      {/* Simple next button */}
      <div className="w-full text-center py-8">
        <button 
          onClick={() => {
            console.log('PhotoGallery button clicked, dispatching nextStep event');
            // Trigger the next step in the parent component
            const event = new CustomEvent('nextStep');
            window.dispatchEvent(event);
          }}
          className="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-lg hover:shadow-orange-500/25"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  )
}