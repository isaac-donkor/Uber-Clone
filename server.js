const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Real-time location updates
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('locationUpdate', ({ userId, lat, lng }) => {
    io.emit('locationBroadcast', { userId, lat, lng });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log('🚗 Uber Clone API running on port', process.env.PORT || 5000);
});
