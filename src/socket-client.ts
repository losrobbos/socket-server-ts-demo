import { io } from 'socket.io-client'

const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL || 'http://localhost:3000'; // Adjust the URL as needed

// connect to socket server
const socket = io(SOCKET_SERVER_URL)

socket
.on("connect", () => {
  console.log(`Connected to socket server at ${SOCKET_SERVER_URL}`);

  socket.emit("message", "Hello from the client!");

  // Listen for messages from the server
  socket.on("message", (msg) => {
    console.log("Message from server:", msg);
  });
})
.on("disconnect", () => {
  console.log("Disconnected from socket server");
})
.on("connect_error", (error) => {
  console.error("Connection error:", error);
});