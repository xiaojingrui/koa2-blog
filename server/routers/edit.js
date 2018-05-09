const Router = require('koa-router');
const {editPage} = require('../controllers');
const router = Router();

// 文章编辑页面渲染路由
router.get('/edit/:id', editPage);

// 登陆
// router.post('/user/login', userInfo.signIn);

module.exports = router;
