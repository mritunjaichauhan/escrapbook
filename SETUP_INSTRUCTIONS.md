# Birthday Scrapbook Setup Instructions

This is a special birthday gift website for your brother. Follow these steps to personalize it with your own content.

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**: http://localhost:3000

## Personalizing Your Content

### 1. Memory Timeline (`src/components/MemoryTimeline.tsx`)
- Edit the `memories` array starting at line 8
- Add your real shared memories with accurate years, titles, and descriptions
- Update locations and emotions to match your experiences

### 2. Photo Gallery (`src/components/PhotoGallery.tsx`)
- Add your photos to `public/images/` folder
- Update the `photos` array starting at line 7
- Replace `/api/placeholder/` with actual image paths like `/images/photo1.jpg`
- Add real captions and dates

### 3. Music Player (`src/components/MusicPlayer.tsx`)
- Add MP3 files to `public/audio/` folder
- Update the `playlist` array starting at line 7
- Add songs that are meaningful to both of you
- Update the memory descriptions for each song

### 4. Voice Messages (`src/components/VoiceMessages.tsx`)
- The recording feature is simulated for now
- You can pre-record voice messages and add them as audio files
- Or keep the interactive demo as a fun feature

### 5. Birthday Letter (`src/components/BirthdayLetter.tsx`)
- Edit the letter content starting at line 21
- Personalize the message with your own words
- Keep it heartfelt and genuine

## Adding Real Images

1. Create image files in `public/images/`:
   - `memory1.jpg`, `memory2.jpg`, etc. for timeline
   - `photo1.jpg`, `photo2.jpg`, etc. for gallery

2. Recommended image sizes:
   - Timeline: 400x300px
   - Gallery: 600-800px (various orientations)

## Adding Real Audio

1. Add MP3 files to `public/audio/`:
   - `song1.mp3`, `song2.mp3`, etc.

2. Keep file sizes reasonable (< 10MB per song)

## Deployment Options

### Option 1: Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy with one click

### Option 2: Static Export
```bash
pnpm build
pnpm export
```
Then host the `out` folder anywhere

### Option 3: Share Locally
- Run on your computer and share screen
- Or host on your local network

## Final Touches

- Test on mobile devices
- Check all animations work smoothly
- Ensure audio files play correctly
- Review the letter one more time

## Sharing with Your Brother

### Low Pressure Options:
1. **Send a link**: "Made something for your birthday. No pressure to respond. [link]"
2. **QR Code**: Print a birthday card with QR code to the site
3. **Email**: Send with subject "Happy Birthday" and just the link

Remember: The goal is to show you care without creating pressure. Let the website speak for itself.

## Need Help?

- Check browser console for errors
- Ensure all file paths are correct
- Test in incognito mode
- Keep it simple and heartfelt

Good luck! I hope this helps bridge the gap with your brother. 💙


