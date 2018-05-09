const commentInfoModel = require('../models/comment-info.js');

const commentInfoService = {
    async saveComment (formData) {
        let result = await commentInfoModel.saveComment({
            aid: formData.aid,
            content: formData.content,
            create_time: formData.create_time,
            uid: formData.uid,
            commentar: formData.commentar
        });
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async getCommentByAid (query) {
        let comments = await commentInfoModel.getCommentByAid(query.aid);
        if (Array.isArray(comments) && comments.length > 0) {
            return comments;
        } else {
            return [];
        }
    }
    
}

module.exports = commentInfoService;