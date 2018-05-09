const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')
const readDir = require('./readDir');
var img_type = '.jpg .png .gif .ico .bmp .jpeg';
const config = require('../serverConfig');
/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}         
 */
function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)
  let uploadPath = options.uploadPath;
  let mkdirResult = mkdirsSync( filePath )
  console.log('req.header = ', ctx.body);
  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = { 
        state: 'FAIL'
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('file--------------');
      let fileName = fileType + '_' + (new Date()).getTime() + '_' + filename;
      let _uploadFilePath = path.join(filePath, fileName);
      let saveTo = path.join(_uploadFilePath)
      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.url = uploadPath + "/" + fileType + '/' + fileName;
        result.title = fileName;
        result.original = filename;
        result.state = 'SUCCESS';
        console.log('文件上传成功！')
      })
    })

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
    
} 
/**
 * 
 * @param {*String} list_dir  文件列表在静态目录下的相对目录 
 * @param {*Number} start 开始index 
 * @param {*Number} size 获取的文件数目  
 */
const  ue_pic_list = async (list_dir, start, size) =>  {
  // console.log(readDir);
    let result = {};
    let list = [];
    // 读取文件目录下的所有文件，返回所有文件的名字形成的数组
    let files = await readDir(path.join(config.staticPath, list_dir));
    let len = files.length;
    if (len === 0) {
        return {
          state: 'no match file',
          list: [],
          start: start,
          total: files.length
        } 
    }
    let end = start + size;
    for (let i = end <= len ? end - 1 : len - 1; i < len && i >= 0 && i >= start; i--) {
        list.push({
            url: path.join('/', list_dir, files[i])
        });
    }
    return {
      "state": "SUCCESS",
      "list": list,
      "start": start,
      "total": files.length
    }
}


module.exports =  {
  uploadFile,
  ue_pic_list
}
