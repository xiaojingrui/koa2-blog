const Router = require('koa-router');
const {visitPage} = require('../controllers');
const router = Router();

// 文章详情页渲染路由
router.get('/visit/:id', visitPage);

module.exports = router;

