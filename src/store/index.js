import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutation';
import actions from './actions';

Vue.use(Vuex);
const state = {
    todos: [],
    user: {
        
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})



