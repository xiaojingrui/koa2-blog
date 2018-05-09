const dbUtils = require('../utils/db-util');

const todo = {
    async addTodo (model) {
        let _sql = `insert into todo_info values('${model.id}', '${model.text}')`;
        let result = await dbUtils.query(_sql);
        return result;
    },
    async getAllTodo () {
        let _sql = `SELECT * from todo_info`;
        let result = await dbUtils.query(_sql);
        if (Array.isArray(result) && result.length > 0) {
            return result;
        } else {
            return [];
        }
    },
    async deleteTodoById (id) {
        let _sql = `
        delete from todo_info
            where id = '${id}'`;
        let result = await dbUtils.query(_sql);
        return result;
    }

}

module.exports = todo;
