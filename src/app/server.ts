import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server as IOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import app from './app';

mongoose.set('strictQuery', false);

const PORT = process.env.PORT || 5000;

// ✅ Safer JWT secret check
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET not defined');

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
export const io = new IOServer(server, {
  cors: {
    origin: ['http://localhost:5173'], // front-end address
    methods: ['GET', 'POST'],
  },
});

// Online users map
export const onlineUsers = new Map<string, string>();

// Extend Socket type
interface AuthSocket extends Socket {
  userId?: string;
}

// SOCKET CONNECTION
io.on('connection', (socket: AuthSocket) => {
  console.log('🔗 Socket connected:', socket.id);

  // 1️⃣ Read token from handshake
  const token = socket.handshake.auth?.token;
  if (!token) {
    console.log('❌ No token provided -> Disconnecting');
    socket.disconnect();
    return;
  }

  // 2️⃣ Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    socket.userId = decoded.id;

    // 3️⃣ Track online user
    onlineUsers.set(decoded.id, socket.id);

    // 4️⃣ Join user's personal room
    socket.join(decoded.id);

    console.log(`✅ User ${decoded.id} connected with socket ${socket.id}`);
  } catch (err) {
    console.log('❌ Invalid token -> Disconnecting socket');
    
    socket.disconnect();
    return;
  }

  // 5️⃣ Handle disconnect
  socket.on('disconnect', () => {
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      console.log(`🔌 User ${socket.userId} disconnected`);
    }
  });
});

// DATABASE + SERVER START
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connected');

    server.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error: any) {
    console.error('❌ Database connection failed:', error?.stack || error);
  }
};

startServer();
