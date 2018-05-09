const dbUtils = require('../utils/db-util');

const commentInfoModel = {
    async saveComment (options) {
        let _sql = `
            INSERT INTO blog_comment (aid, content, create_time, uid, commentar) 
            VALUES ('${options.aid}', '${options.content}', '${options.create_time}', '${options.uid}', '${options.commentar}'); 
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async getCommentByAid (aid) {
        let _sql= `
            SELECT * from blog_comment where aid = '${aid}';
        `;
        let comments = await dbUtils.query(_sql);
        return comments;
    }
}

module.exports = commentInfoModel;