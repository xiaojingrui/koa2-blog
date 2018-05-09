const Router = require('koa-router');
const {loginPage} = require('../controllers');
const router = Router();

// 页面渲染路由
router.get('/login', loginPage);




module.exports = router;

1