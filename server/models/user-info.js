const dbUtils = require('../utils/db-util');

const userInfoModel = {
    async getUserInfoByUserNameAndPassword (options) {
        // console.log('moedlOptiion = ', options);
        let _sql = `
            SELECT * from blog_user
            where username = "${options.username}" and password = "${options.password}";
        `;
        console.log('_sql', _sql);
        let result = await dbUtils.query(_sql);
        console.log('sqlResult = ', result);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
            console.log('userInfo = ', result);
        } else {
            result = null;
        }
        return result;
    },
    async getUserInfoById(id) {
        let _sql = `
            SELECT * from blog_user
            where id = ${id};
        `;
        let result = await dbUtils.query(_sql);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    },
    async getUserInfoByUserName (username) {
        let _sql = `
            SELECT * from blog_user
            where username = '${username}'
        `;
        
        let result = await dbUtils.query(_sql);
        console.log('model = ', result);
        if (Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    },
    async registerUser (options) {
        let _sql = `
            INSERT INTO blog_user (username, password) 
            VALUES ('${options.username}', '${options.password}'); 
        `;
        let result = await dbUtils.query(_sql);
        return result;
    }

}

module.exports = userInfoModel;