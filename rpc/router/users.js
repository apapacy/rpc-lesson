const Router = require('./router');

const router = Router();

router.use('GET_LIST', async (socket, payload, callback) => {
  const limit = Number(payload.pagination.perPage);
  const offset = (Number(payload.pagination.page) - 1) * limit
  return callback({data: users.slice(offset, offset + limit ), total: users.length});
});

router.use('GET_ONE', async (socket, payload, callback) => {
  return callback({ data: users[payload.id]});
});

router.use('UPDATE', async (socket, payload, callback) => {
  users[payload.id] = payload.data
  return callback({ data: users[payload.id] });
});

module.exports = router;

const users = [];
for (let i = 0; i < 10000; i++) {
  users.push({ id: i, name: `name of ${i}`});
}
