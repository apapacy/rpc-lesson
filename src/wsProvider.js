import io from 'socket.io-client';

const socket = io({
  path: '/ws',
  transports: ['websocket']
});

export default (action, collection, payload = {}) =>
  new Promise((resolve, reject) => {
    socket.emit('remote-call', {action, collection, payload}, (response) => {
      if (response.error) {
        reject(response);
      } else {
        resolve(response);
      }
    });
});
