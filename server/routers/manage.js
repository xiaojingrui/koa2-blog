const Router = require('koa-router');
const {managePage} = require('../controllers');
const router = Router();

// 文章管理页面渲染路由
router.get('/manage', managePage);

// 登陆
// router.post('/user/login', userInfo.signIn);


module.exports = router;
