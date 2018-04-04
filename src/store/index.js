import Vue from 'vue';
import Vuex from 'vuex';
import taskInterface from '@/assets/interface/task';

Vue.use(Vuex);
const state = {
  taskList: []
};

const mutations = {
  setTaskList(state, list) {
    state.taskList = list;
  }
};

const actions = {
  fetchTaskList(context, options) {
    taskInterface.fetchTaskList().then(res => {
      context.commit('setTaskList', res || []);
    });
  },

  createTaskList(context, options) {
    return new Promise((resolve, reject) => {
      taskInterface.createTaskList(options).then(res => {
        resolve('');
        context.dispatch('fetchTaskList');
      });
    });
  },

  updateTaskList(context, options) {
    return new Promise((resolve, reject) => {
      taskInterface.updateTaskList(options).then(res => {
        resolve('');
        context.dispatch('fetchTaskList');
      });
    });
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

export default store;
