import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Disconnect after 3 seconds
  setTimeout(() => {
    console.log("Disconnecting client...");
    socket.disconnect(); // explicit disconnect
  }, 3000);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
