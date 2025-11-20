// server.ts
import dotenv from "dotenv";
import mongoose from "mongoose";

import { createServer } from "http";
import { Server as IOServer } from "socket.io"

dotenv.config();

import app from "./app"


const port= 5000;

let server= createServer(app);

export const io= new IOServer(server, {

     cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
     },

})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

})

const main = async () => {

    try {

      await mongoose.connect(process.env.MONGO_URI as string);

      console.log("DB connected");

      server.listen(port, () => console.log(`Server running on ${port}`));

    }catch (error) {

      console.error("DB connection failed:", error);

    }


}

main();

