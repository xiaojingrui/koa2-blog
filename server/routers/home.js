const Router = require('koa-router');
const {homePage} = require('../controllers');
const router = Router();

// 首页渲染路由
router.get('/', homePage);

// 登陆
// router.post('/user/login', userInfo.signIn);


module.exports = router;
