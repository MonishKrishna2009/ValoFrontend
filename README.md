# Valorant Scrimish Overlay

A real-time overlay system for Valorant Scrimish matches with manual score control and Spectra-style design.

## Features

✅ **Real-time Updates**: Live score updates via WebSocket  
✅ **Manual Control**: Simple +/- buttons for score management  
✅ **Custom Teams**: Set team names and logos  
✅ **Round Tracking**: Display round numbers  
✅ **Side Indicator**: Visual Attack/Defense colors  
✅ **Event Branding**: Custom event name or Spectra attribution  
✅ **ATC Logo**: Centered logo with circular background  
✅ **Spectra Theme**: Matches official Spectra styling 1:1

## Quick Start

1. **Install Bun** (if not already installed):
```bash
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```

2. **Install dependencies:**
```bash
bun install
```

3. **Start the server:**
```bash
bun run server.js
# OR use the provided script:
./start.sh
```

4. **Open two browser windows:**
   - **Control Panel**: http://localhost:3000
   - **Overlay**: http://localhost:3000/overlay

## How to Use

### Control Panel (`http://localhost:3000`)
The control panel lets you manage the match in real-time:
- **Team Names**: Enter team names in the text fields
- **Scores**: Use +/- buttons to adjust scores instantly
- **Round Number**: Set the current round
- **Sides**: Toggle which team is attacking (changes colors)
- **Event Name**: Set a custom event name or show Spectra attribution

### Overlay (`http://localhost:3000/overlay`)
The overlay displays at **1920x1080 resolution** and is perfect for:
- OBS browser source
- Screen capture
- Live streaming
- Tournament broadcasts

Features:
- **Top Score Bar**: Team names, logos, scores, and side indicators
- **Central ATC Logo**: Your custom logo with black circular background
- **Round Number**: Current round displayed below logo
- **Event Name**: Top-right event branding
- **Attack/Defense Colors**: Red for attack, Cyan for defense

## Customizing Your Logo

Replace the ATC logo:
```
public/assets/misc/icon.webp
```
**Recommendations:**
- Use WebP format for best performance
- Size: Square aspect ratio works best
- Size: 200x200 to 400x400 pixels
- Transparent background preferred

The logo appears in:
- Center of the score bar (120x120px with drop shadow)
- Event name area if using attribution
- Team logo placeholders (40x40px)

## Customization

### Event Name
In the control panel, you can:
- Enter a custom event name
- Check "Show Spectra Attribution" to use "POWERED BY SPECTRA"

### Colors
Team colors are already set to match Spectra:
- **Attacker**: Red (#E94560)
- **Defender**: Cyan (#46F4CF)

### Black Background (Debug)
Currently the overlay has a black background for debugging. To make it transparent:
Edit `public/overlay.html` line 28:
```css
background: transparent;  /* Change from #000000 */
```

## Port Configuration

Default port is **3000**. Change it:
```bash
PORT=8080 npm start
```

## File Structure

```
Valo-Frontend/
├── server.js              # WebSocket server
├── package.json           # Dependencies
├── public/
│   ├── control.html       # Control panel
│   ├── overlay.html       # Overlay display
│   └── assets/
│       ├── misc/
│       │   └── icon.webp  # Your ATC logo
│       ├── topscore/      # SVG graphics
│       └── fonts/         # Font files
└── README.md
```

## Technology

- **Express.js**: RESTful API and static file serving
- **Socket.IO**: Real-time bidirectional communication
- **Vanilla HTML/CSS**: No framework dependencies
- **Spectra Assets**: Professional SVG graphics

## Browser Compatibility

Tested and optimized for:
- Chrome/Edge (recommended)
- Firefox
- Opera

Best viewed at **1920x1080** resolution.

## License

Free to use and modify for your Valorant events!

---

**Need Help?** Make sure the server is running and both browser windows are connected. Check the browser console for any connection errors.

