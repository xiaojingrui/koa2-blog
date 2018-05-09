const commentInfoService = require('../services/comment-info');
const articleInfoService = require('./../services/article-info');

const saveComment = async (ctx) => {
    let formData = ctx.request.body;
    //console.log('formData = ', formData);
    let result = {
        success: false,
        message: '',
        data: ''
    };
    let session = ctx.session;
    formData = Object.assign(formData, {
        uid: session.userId,
        commentar: session.userName
    });
    let params = {
        create_time: formData.create_time,
        id: formData.aid
    }
    let retCommentPv = await articleInfoService.updateArticleCommentPv(params);
    let retComment = await commentInfoService.saveComment(formData);
    let retCommentTime = await articleInfoService.updateArticleCommentTime(params);
    
    if (retComment && retCommentTime && retCommentPv) {
        result.success = true;
        result.message = '保存成功';
    } else {
        result.message = '保存失败';
    }
    ctx.body = result;
}

const getCommentByAid = async (ctx) => {
    let request = ctx.request;
    let query = request.query;
    let result = {
        success: false,
        message: '',
        data: ''
    };
    let commentResult = await commentInfoService.getCommentByAid(query);
    if (commentResult) {
        result.success = true;
        result.data = commentResult;
        if (commentResult.length > 0) {
            result.message = '有数据';
        } else {
            result.message = '没有数据';
        }
    } else {
        result.message = '获取评论失败';
    }
    ctx.body = result;
}

module.exports = {
    saveComment,
    getCommentByAid
}