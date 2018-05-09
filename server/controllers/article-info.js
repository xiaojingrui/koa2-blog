const articleInfoService = require('./../services/article-info');
const path = require('path');
const fs = require('fs');
const multer = require('koa-multer');
const { uploadFile } = require('../utils/upload');
const config = require('../serverConfig');

// const parse = require('await-busboy')
// var parse = require('co-busboy');

//配置  
// var storage = multer.diskStorage({  
//   //文件保存路径  
//   destination: function (req, file, cb) {  
//     cb(null, path.join(__dirname, "./"));  
//   },  
//   //修改文件名称  
//   filename: function (req, file, cb) {  
//     var fileFormat = (file.originalname).split(".");  
//     cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
//   }  
// })  
// //加载配置  
// var upload = multer({ storage: storage }); 


  


const getArticleByPage = async(ctx) => {
  let request = ctx.request;
  let query = request.query;
  let result = {
    success: false,
    message: '',
    data: ''
  }
  // console.log('query = ', query)
  let articleResult = await articleInfoService.getArticleByPage(query);
  // console.log('pageArticleCon = ', articleResult);
   //console.log('controller = ', articleResult,articleResult.articles.length);
  if (articleResult) {
    result.success = true;
    // console.log('---------', articleResult);
    result.data = articleResult;
    if (articleResult.length > 0) {
      result.message = "有数据";
    } else {
      result.message = "没有数据";
    }
  } else {
    result.message = "获取文章失败";
  }
  ctx.body = result;
}

const deleteArticleById = async(ctx) => {
  let formData = ctx.request.body;
  // console.log('formData = ', formData);


  let result = {
    success: false,
    message: '',
    data: ''
  }
  let retData = await articleInfoService.deleteArticleById(formData);
  if (retData) {
    result.success = true;
    result.message = '删除成功';
  } else {
    result.message = '删除失败';
  }
  // console.log('resultDaata = ', resultData);
  ctx.body = result;
}

const getArticeById = async(ctx) => {
  let request = ctx.request;
  let query = request.query;
  let result = {
    success: false,
    message: '',
    data: ''
  };
  let retUpdate = await articleInfoService.updateArticleHitPv(query);
  let article = await articleInfoService.getArticeById(query);
  // console.log(articleInfoService);

  console.log('retUpdate = ', retUpdate);
  // console.log('article = ', article);
  if (article !== '') {
    result.success = true;
    result.data = article;
    result.message = "获取文章成功";
  } else {
    result.message = "获取文章失败";
  }
  ctx.body = result;
}

const saveArticle = async(ctx) => {
  let formData = ctx.request.body;
  console.log('formData = ', formData);
  let result = {
    success: false,
    message: '',
    data: ''
  };
  let retData;
  // console.log(formData.id !== '0');
  if (formData.id !== '0') {
    retData = await articleInfoService.saveArticleById(formData);
  } else {
    let session = ctx.session;
    formData = Object.assign(formData, {
      uid: session.userId,
      author: session.userName
    });
    let params = {
      id: formData.id,
      update_time: formData.update_time
    };
    retData = await articleInfoService.saveArticle(formData);
    let retUpdate = await articleInfoService.updateArticleUpdateTime(params);
    if (retData && retUpdate) {
      retData = true;
    }
  }


  if (retData) {
    result.success = true;
    result.message = '保存成功';
  } else {
    result.message = '保存失败';
  }
  ctx.body = result;
}

// const updateArticleUpdateTime = async (ctx) => {
//     let formData = ctx.request.body;
//     console.log('formData = ', formData);
//     let result = {
//         success: false,
//         message: '',
//         data: ''
//     };
//     let retData = await articleInfoService.updateArticleUpdateTime(formData);
//     if (retData) {
//         result.success = true;
//         result.message = '更新成功';
//     } else {
//         result.message = '更新失败';
//     }
//     ctx.body = result;
// }


// 上传图片
// const uploadImage = async (ctx) => {
//     const storage = multer.diskStorage({
//         //设置上传后文件路径
//         destination: function (req, file, cb) {
//             // console.log('xxxreq = ', req);
//             // console.log('xxxfile = ', file);
//             cb(null, path.join(config.staticPath, './upload'));
//         },
//         // xxxfile =  { fieldname: 'uploadImage',
//         //             originalname: '4.png',
//         //             encoding: '7bit',
//         //             mimetype: 'image/png' }

//         //给上传文件重命名，获取添加后缀名
//         filename: function (req, file, cb) {
//             var fileFormat = (file.originalname).split(".");
//             cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//         }
//     });
//     const upload = multer({
//         storage: storage
//     });
//     return upload.any(ctx);
// }

module.exports = {
    getArticleByPage,
    deleteArticleById,
    getArticeById,
    saveArticle
    // uploadImage
    // updateArticleUpdateTime
}
