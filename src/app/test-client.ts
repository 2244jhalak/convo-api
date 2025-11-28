import { io } from 'socket.io-client';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjcwOWE5ZjRkNjllOTI3NzZjNDdkOSIsImlhdCI6MTc2NDE3MzY5NCwiZXhwIjoxNzY0Nzc4NDk0fQ.qvJjWV4sEzDaf2s43BG09flpqocngUBNeC41JbXPRgU';

const socket = io('http://localhost:5000', {
  auth: { token },
  reconnection: true,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('🔥 Connected:', socket.id);
});

socket.on('notification', (data) => {
  console.log('📩 New Notification:', data);
});

socket.on('connect_error', (err) => {
  console.log('❌ Connection error:', err.message);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected');
});
