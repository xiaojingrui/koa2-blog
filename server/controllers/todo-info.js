const todo = require('./../services/todo-info');
const fs = require('fs');

const getAllTodos = async (ctx, next) => {
    let result = await todo.getAllTodo();
    ctx.body = result;
    // console.log('todo');
}

const rootTodoList = async (ctx) => {
    let html = await fs.readFileSync('../dist/index.html', 'utf-8');
    // ctx.end('../dist/index.html');
    ctx.body = html;
}

const addTodo = async (ctx) => {
    let postData = ctx.request.body;
    let result = await todo.addTodo(postData);
    // return result;
    ctx.body = result;
    // console.log(result);
}
const deleteTodoById = async (ctx) => {
    let postData = ctx.request.body;
    let result = await todo.deleteTodoById(postData.id);
    // return result;
    ctx.body = result;
}

module.exports = {
    getAllTodos,
    rootTodoList,
    addTodo,
    deleteTodoById
}