
const Router = require('koa-router');
const {articleInfo, userInfo, commentInfo} = require('../controllers');
const router = Router();
const path = require('path');

// ---------------------------------------multer上传图片测试
// const multer = require('koa-multer');
// const config = require('../serverConfig');
// const storage = multer.diskStorage({
//     //设置上传后文件路径
//     destination: function (req, file, cb) {
//         console.log('xxxreq = ', req);
//         console.log('xxxfile = ', file);
//         cb(null, path.join(config.staticPath, './upload'));
//     },
//     // xxxfile =  { fieldname: 'uploadImage',
//     //             originalname: '4.png',
//     //             encoding: '7bit',
//     //             mimetype: 'image/png' }

//     //给上传文件重命名，获取添加后缀名
//     filename: function (req, file, cb) {
//         var fileFormat = (file.originalname).split(".");
//         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// });
// const upload = multer({
//     storage: storage
// });
// ---------------------------------------multer上传图片测试


// console.log(commentInfo);
// 登陆
router.post('/user/signin', userInfo.signIn);
// 注册
router.post('/user/register', userInfo.registerUser);
// 检查是否登录
router.post('/api/checkLogin', userInfo.checkLogin);
// 获取所有文章
router.get('/api/getArticle', articleInfo.getArticleByPage);
// 删除文章
router.post('/api/deleteArticle', articleInfo.deleteArticleById);
// 根据id获取文章内容
router.get('/api/getArticleById', articleInfo.getArticeById);
// 写文章保存
router.post('/api/saveArticle', articleInfo.saveArticle);
// 保存评论
router.post('/api/saveComment', commentInfo.saveComment);
// 根据文章id获取评论
router.get('/api/getCommentByAid', commentInfo.getCommentByAid);
// 图片上传测试
// router.post('/api/uploadImage', upload.any(), async (ctx) => {
//     console.log('upload----------------------xxxxxx');
// } );
module.exports = router;