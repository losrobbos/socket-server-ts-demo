import { Server as SocketServer } from 'socket.io';
import express from 'express';

const app = express();

// HOME ROUTE
// This is the main entry point of the application
app.get("/", (_req, res) => {
  res.send("Hello World. Hier kommt gleich der geile Socket Server!");
});

const PORT = process.env.PORT || 3000;
const httpServer = app.listen(PORT, () => {
  console.log("[SERVER] Server is running on port http://localhost:" + PORT);
});

// SOCKET.IO SERVER
const io = new SocketServer(httpServer, {
  cors: {
    origin: '*', // Allow all origins for CORS
    methods: ['GET', 'POST'], // Allow GET and POST methods
  }
});

console.log("[SERVER] Socket.IO server is running");

// Handle incoming socket connections
io.on('connection', (socket) => {
  console.log("[SERVER] A client connected:", socket.id);

  // server side message handling
  socket.on("message", (msg) => {
    console.log('[SERVER] Message received:', msg);
    // Echo the message back to the client
    // socket.emit("message", `Echo: ${msg}`);

    // this call makes a broadcast to EVERYONE in the current room
    // under the hood this replaces the two separate calls to socket.emit (to sender only) and socket.broadcast.emit (to all other connected users)
    io.emit("message", `Echo: ${msg}`);
    // Broadcast to every other user in the room 
    // socket.broadcast.emit("message", socket.id + ": " + msg)
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('[SERVER] Client disconnected:', socket.id);
  });
});