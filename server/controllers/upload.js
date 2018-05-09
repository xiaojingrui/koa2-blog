const path = require('path');
// 文件上传和获取文件列表函数
const { uploadFile, ue_pic_list } = require('../utils/upload');

const ueditor = async (ctx) => {
    // ueditor配置文件
    if (ctx.query.action === 'config') {
        ctx.type = "json";
        ctx.redirect("/ueditor/nodejs/config.json");
    } else if (ctx.query.action === 'listimage') {
        ctx.body = await ue_pic_list( '/upload/image', ctx.query.start, ctx.query.size);
    } else if (ctx.query.action === 'listfile') {
        ctx.body = await ue_pic_list( '/upload/image', ctx.query.start, ctx.query.size);
    } else if (ctx.query.action === 'uploadimage' || ctx.query.action === 'uploadfile') {
        // 图片文件类型分类
        let fileType = 'image';
        if (ctx.query.action === 'uploadfile') {
            fileType = 'file';
        }
        // 响应对象
        let result = { state: "FAIL" };
        // 保存地址
        let serverFilePath = path.join(__dirname, '../../static/upload');
        result = await uploadFile(ctx, {
            fileType: fileType,
            path: serverFilePath,
            // 公共静态目录下的上传目录，传递此项是为了处理返回的url，upload是相对静态服务器目录的
            uploadPath: '/upload'
        })
        ctx.body = result;
    }
} 

module.exports = {
    ueditor
}