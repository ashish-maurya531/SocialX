const { Server } = require('socket.io');
const Message = require('../models/messageModel');

function chatSocket(server) {
  const io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('send_message', async (data) => {
      const msg = new Message(data);
      await msg.save();
      io.emit('receive_message', msg);
    });
  });
}

module.exports = chatSocket;