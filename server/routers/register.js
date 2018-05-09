const Router = require('koa-router');
const {registerPage} = require('../controllers');
const router = Router();

// 注册页面路由
router.get('/register', registerPage);




module.exports = router;

