const Router = require('./router');
const users = require('./users');

const router = Router();

router.use('users', users)

module.exports = router;
