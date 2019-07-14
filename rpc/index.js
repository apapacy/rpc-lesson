const server = require('http').createServer();
const io = require('socket.io')(server, { path: '/ws' });
const Router = require('./router/router');
const router = require('./router');

const mainRouter = Router();
mainRouter.use('remote-call', router);

io.on('connection', (socket) => {
  socket.on('remote-call', async ({ collection, action, payload }, callback) => {
    mainRouter.route(['remote-call', collection, action], socket, payload, callback);
  });
});

server.listen(5000, () => {
  console.log('dashboard backend listening on *:5000');
});
