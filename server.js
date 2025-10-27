const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['polling', 'websocket'],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Compression for better network performance
app.use((req, res, next) => {
  // Compress responses
  res.set('Cache-Control', req.path.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-store');
  next();
});

// Set no-cache headers for HTML files to prevent caching issues
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  next();
});

// Serve static files with long cache for assets (images, CSS, JS)
app.use(express.static('public', {
  maxAge: '365d', // Cache assets for 1 year
  etag: false, // Disable ETag for better performance
  immutable: true // Mark as immutable for browser caching
}));

// Store current match state
let matchState = {
  team1Name: "TEAM 1",
  team2Name: "TEAM 2",
  team1Score: 0,
  team2Score: 0,
  roundNumber: 0,
  team1IsAttacking: false,
  eventName: "Scrimish Match",
  showSpectraAttribution: false
};

// Serve control page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'control.html'));
});

// Serve overlay page
app.get('/overlay', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'overlay.html'));
});

// API endpoints for updating score
app.post('/api/update-score', (req, res) => {
  const { team, delta } = req.body;
  
  if (team === 'team1') {
    matchState.team1Score = Math.max(0, matchState.team1Score + delta);
  } else if (team === 'team2') {
    matchState.team2Score = Math.max(0, matchState.team2Score + delta);
  }
  
  io.emit('match_update', matchState);
  res.json({ success: true, matchState });
});

// API endpoint for updating round number
app.post('/api/update-round', (req, res) => {
  const { roundNumber } = req.body;
  matchState.roundNumber = roundNumber;
  
  io.emit('match_update', matchState);
  res.json({ success: true, matchState });
});

// API endpoint for updating team names
app.post('/api/update-teams', (req, res) => {
  const { team1Name, team2Name } = req.body;
  matchState.team1Name = team1Name;
  matchState.team2Name = team2Name;
  
  io.emit('match_update', matchState);
  res.json({ success: true, matchState });
});

// API endpoint for updating event name
app.post('/api/update-event', (req, res) => {
  const { eventName, showSpectraAttribution } = req.body;
  matchState.eventName = eventName;
  matchState.showSpectraAttribution = showSpectraAttribution;
  
  io.emit('match_update', matchState);
  res.json({ success: true, matchState });
});

// API endpoint for updating sides
app.post('/api/update-sides', (req, res) => {
  const { team1IsAttacking } = req.body;
  matchState.team1IsAttacking = team1IsAttacking;
  
  io.emit('match_update', matchState);
  res.json({ success: true, matchState });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current state to newly connected client
  socket.emit('match_update', matchState);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Valo Scrimish Overlay running on http://localhost:${PORT}`);
  console.log(`Control page: http://localhost:${PORT}`);
  console.log(`Overlay page: http://localhost:${PORT}/overlay`);
});

