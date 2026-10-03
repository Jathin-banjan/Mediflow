/**
 * Real-time Socket.IO handler for Patient Flow & Queue Updates
 */

let ioInstance = null;

const initQueueSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`⚡ Socket client connected: ${socket.id}`);

    // Join specific queue room (e.g. queue:12345)
    socket.on('join_queue', (queueId) => {
      if (queueId) {
        socket.join(`queue:${queueId}`);
        console.log(`Socket ${socket.id} joined room queue:${queueId}`);
      }
    });

    // Leave queue room
    socket.on('leave_queue', (queueId) => {
      if (queueId) {
        socket.leave(`queue:${queueId}`);
        console.log(`Socket ${socket.id} left room queue:${queueId}`);
      }
    });

    // Join personal user room for targeted notifications
    socket.on('join_user', (userId) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`Socket ${socket.id} joined user room user:${userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`⚡ Socket client disconnected: ${socket.id}`);
    });
  });
};

const emitQueueUpdate = (queueId, data) => {
  if (ioInstance && queueId) {
    ioInstance.to(`queue:${queueId}`).emit('queue_updated', data);
    // Also emit global patient flow update
    ioInstance.emit('global_flow_updated', { queueId, ...data });
  }
};

const emitUserNotification = (userId, notification) => {
  if (ioInstance && userId) {
    ioInstance.to(`user:${userId}`).emit('notification_received', notification);
  }
};

module.exports = {
  initQueueSocket,
  emitQueueUpdate,
  emitUserNotification
};
