const articleInfoModel = require('./../models/article-info');
const articleInfoService = {
    async getArticleByPage (query) {
        // console.log('serviceQuery = ', query);
        // 相应变量声明
        let result = {
            articles: [],
            max_page: 0,
            page: 0
        }
        // 每页显示文章数量
        const per_num = parseInt(query.perNum);
        // 最大页码
        let max_page;
        // 返回文章数量
        let retCount;
        // 该页在数组中开始index
        let baseInedx;
        // 返回文章存储容器
        let retArticle = [];
        // 获取page，类型转换为number
        let page = parseInt(query.page);
        // 最后一页的文章数量
        let lastCount;
        // 获取page下，filterText过滤的数据
        let articles = await articleInfoModel.getArticleByPage({
            page,
            filterText: query.filterText
        });
        // ----------------------
        total_count = articles.length;
        max_page = Math.ceil(total_count / per_num);
        
        // page异常处理
        if (page > max_page && max_page !== 0) {
            page = max_page;
        }
        if (page < 0) {
            page = 1;
        }
        // console.log('max_page = ', max_page);
        // console.log('page = ', page);
        // 该页在数组中开始index
        baseIndex = (page - 1) * per_num;
        // 最后一页的处理
        lastCount = total_count % per_num === 0? per_num : total_count % per_num;
        retCount = page == max_page ? lastCount : per_num;
        // 不存在数据的特殊情况，即max_page = 0
        if (max_page === 0) {
            retCount = 0;
        } 
        // 获取返回的数据
        for (let i = 0; i < retCount; i++) {
            retArticle.push(articles[baseIndex + i]);
        }
        // console.log('retAtfcile = ', retArticle);
        // 返回对象填充
        result.articles = retArticle;
        result.max_page = max_page;
        result.page = page;
        return result;








        // ----------------------------
        // return resultData;
    },
    async deleteArticleById (formData) {
        let result;
        result = await articleInfoModel.deleteArticleById(formData.id);
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
        // return result;
    },
    async getArticeById(query) {
        console.log(query.id);
        let article = await articleInfoModel.getArticeById(query.id);
        // console.log('articleService = ', article);
        if (Array.isArray(article) && article.length > 0) {
            return article[0];
        } else {
            return '';
        }
        // console.log('article = ', article);
        // return article;
    },
    async saveArticleById (formData) {
        let result;
        result = await articleInfoModel.saveArticleById({
            id: formData.id,
            content: formData.content,
            title: formData.title,
            intro: formData.intro,
            update_time: formData.update_time
        });
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async saveArticle (formData) {
        let result;
        result = await articleInfoModel.saveArticle({
            uid: formData.uid,
            author: formData.author,
            content: formData.content,
            title: formData.title,
            intro: formData.intro,
            post_time: formData.post_time,
            update_time: formData.update_time
        });
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async updateArticleCommentTime (formData) {
        let result;
        result = await articleInfoModel.updateArticleCommentTime({
            comment_time: formData.create_time,
            id: formData.id
        });
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async updateArticleUpdateTime (formData) {
        let result;
        result = await articleInfoModel.updateArticleUpdateTime({
            update_time: formData.update_time,
            id: formData.id
        });
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async updateArticleCommentPv (formData) {
        let result = true;
        console.log('fomrData pv = ', formData);
        result = await articleInfoModel.updateArticleCommentPv(formData.id);
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    },
    async updateArticleHitPv (formData) {
        let result;
        console.log('typef ======', typeof formData.id)
        result = await articleInfoModel.updateArticleHitPv(formData.id);
        console.log('result --------', result);
        if (result.affectedRows === 1) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = articleInfoService;