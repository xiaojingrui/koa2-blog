const dbUtils = require('../utils/db-util');

const articleInfoModel = {
    async getArticleByPage (options) {
        // console.log('moedlOptiion = ', options);
        let _sql = `
            SELECT * from blog_article 
            where isDeleted = 0 and title like '%${options.filterText}%';
        `;
        // 返回数据为数组格式
        let articles = await dbUtils.query(_sql);
        return articles;
    },
    async deleteArticleById (id) {
        let _sql = `
            UPDATE blog_article SET isDeleted=1 where  id = ${id};
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async getArticeById(id) {
        let _sql = `
            SELECT * from blog_article
            where id = '${id}';
        `;
        let article = await dbUtils.query(_sql);
        return article;
    },
    async saveArticleById(options) {
        let _sql = `
            UPDATE blog_article 
            SET content = '${options.content}',
                title = '${options.title}',
                intro = '${options.intro}',
                update_time = '${options.update_time}'
            WHERE  id = '${options.id}';
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async saveArticle(options) {
        console.log('options = ', options);
        let _sql = `
        INSERT INTO blog_article (uid, title, content, intro, post_time, update_time, author) 
        VALUES ('${options.uid}', '${options.title}', '${options.content}', '${options.intro}', '${options.post_time}', '${options.update_time}', '${options.author}');
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    // 
    async updateArticleCommentTime(options) {
        let _sql = `
            UPDATE blog_article 
            SET last_comment_time = '${options.comment_time}'
            WHERE  id = '${options.id}';
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async updateArticleUpdateTime(options) {
        let _sql = `
            UPDATE blog_article 
            SET last_comment_time = '${options.update_time}'
            WHERE  id = '${options.id}';
        `;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async updateArticleCommentPv(id) {
        let _sql = `
            UPDATE blog_article 
            SET comment_pv = comment_pv + 1
            WHERE  id = '${id}';
        `;
        console.log('commentpv = ');
        let result = await dbUtils.query(_sql);
        return result;
        // return true;
    },
    async updateArticleHitPv(id) {
        let _sql = `
            UPDATE blog_article 
            SET hit_pv = hit_pv+1
            WHERE id = '${id}';
        `;
        console.log('sql ============', _sql);
        console.log('id ++++++++++', id);
        let result = await dbUtils.query(_sql);
        return result;
        // return true;

    },
}

module.exports = articleInfoModel;

// insert into blog_article 
// values(null, 1, '学习记录222', '这是文本你本这是文本这是文本你', '这是文本这是文本', '2017-12-21 15:53:16', '2017-12-21 15:53:16', null, 0, 0, 0);