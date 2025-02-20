const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-2g8331nsi-tharaldssons-projects.vercel.app", // Byt ut vid deployment
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("En användare anslöt", socket.id);

  socket.on("message", (data) => {
    console.log("Meddelande mottaget:", data);
    io.emit("message", data); // Skickar vidare till alla anslutna klienter
  });

  socket.on("disconnect", () => {
    console.log("En användare kopplade från", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});
