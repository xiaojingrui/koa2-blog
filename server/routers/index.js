const Router = require('koa-router');
const apiRoutes = require('./api')
const homeRoutes = require('./home');
const loginRoutes = require('./login');
const editRoutes = require('./edit');
const manageRoutes = require('./manage');
const visitRoutes = require('./visit');
const registerRoutes = require('./register');
const router = Router();
// console.log(todo);
// router.use(todo.routes(), todo.allowedMethods());

// 路由汇总
router.use(apiRoutes.routes(), apiRoutes.allowedMethods());
router.use(loginRoutes.routes(), loginRoutes.allowedMethods());
router.use(registerRoutes.routes(), registerRoutes.allowedMethods());
router.use(visitRoutes.routes(), visitRoutes.allowedMethods());
router.use(editRoutes.routes(), editRoutes.allowedMethods());
router.use(manageRoutes.routes(), manageRoutes.allowedMethods());
router.use(homeRoutes.routes(), homeRoutes.allowedMethods());



// console.log('111');
module.exports = router;