const todoModel = require('./../models/todo-info');

const todo = {
    async addTodo (model) {
        let result = await todoModel.addTodo({
            id: model.id,
            text: model.text
        });
        return result;
    },
    async getAllTodo () {
        let result = await todoModel.getAllTodo();
        return result;
    },
    async deleteTodoById (id) {
        let result = await todoModel.deleteTodoById(id);
        console.log(result);
    }
}

module.exports = todo;