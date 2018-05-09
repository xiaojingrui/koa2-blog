const Koa = require('koa');
const koaStatic = require('koa-static');
const multer = require('koa-multer');
// 不支持解析multipart/form-data类型，解析multipart/form-data使用其他中间件
const bodyParser = require('koa-bodyparser');
// 支持解析multipart/form-data类型，但是返回的是二进制数据，存储是个问题
// const koaBody = require('koa-body');
const Pug = require('koa-pug');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const config = require('./serverConfig');
// const Ueditor = require('koa-ueditor');

const routes = require('./routers');
const router = require('koa-router')();
// console.log(routes);
const path = require('path');
const { ueditor } = require('./controllers/upload');

const app = new Koa();
// pug中间件配置
const pug = new Pug({
  viewPath: path.join(__dirname, './views'),
  app: app // equals to pug.use(app) and app.use(pug.middleware)
})

// session存储配置
const sessionMysqlConfig= {
	user: config.database.USERNAME,
	password: config.database.PASSWORD,
	database: config.database.DATABASE,
	host: config.database.HOST,
}
// 存放sessionId的cookie配置
let cookie = {
	maxAge: 1000 * 60 * 60 * 24 * 2, // cookie有效时长
	expires: '',  // cookie失效时间
	path: '/', // 写cookie所在的路径
	domain: 'localhost', // 写cookie所在的域名
	httpOnly: true, // 是否只用于http请求中获取
	overwrite: true,  // 是否允许重写
	secure: '',
	sameSite: '',
	signed: '',
  }
// 配置session中间件
app.use(session({
	key: 'USER_SID',
	store: new MysqlStore(sessionMysqlConfig),
	cookie
}));
// 服务器启动用时
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
// 配置控制台日志中间件
app.use(koaLogger());
// 配置静态资源加载中间件
const staticPath = path.join(__dirname, '../static');
app.use(koaStatic(staticPath));

// console.log('+++++++++++++++++++', path.join(__dirname , '../dist'));
// ctx.body解析中间件,post
app.use(bodyParser());
// app.use(koaBody({multipart:true}));
// 配置koa-ueditor
// let ueditor = Ueditor(staticPath);
router.all('/ueditor/ue', ueditor);

app.on('error', (err, ctx) => {
    console.log('some error is happened', err);
});
//  初始化路由中间件
app.use(router.routes(), router.allowedMethods());
app.use(routes.routes(), routes.allowedMethods());


app.listen(config.port, () => {
    console.log(`server is running at port ${config.port}......`);
});