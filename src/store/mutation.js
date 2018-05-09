import * as types from './mutation-types';

// mutaions
const mutations = {
    [types.ADD_TODO] (state, todo) {
        state.todos.push(todo);
    },
    [types.DELETE_TODO] (state, id) {
        state.todos = state.todos.filter((item, index, arr) => {
            return item.id !== id;
        });
    },
    [types.GET_BASE_DATA] (state, todos) {
        state.todos = todos;
        console.log('mu ', state.todos);
    }

}

export default mutations;