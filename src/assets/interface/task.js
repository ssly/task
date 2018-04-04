import axios from '../js/ajax';
const HOST = 'http://127.0.0.1:8678';

function fetchTaskList() {
  return new Promise((resolve, reject) => {
    axios.get(`${HOST}/task/manager`, { options: { x: 1, y: 2 } }).then(res => {
      resolve(res.data);
    });
  });
}

function createTaskList(options) {
  return new Promise((resolve, reject) => {
    axios.post(`${HOST}/task/manager`, options).then(res => {
      resolve(res.data);
    });
  });
}

function updateTaskList(options) {
  return new Promise((resolve, reject) => {
    axios.put(`${HOST}/task/manager`, options).then(res => {
      resolve(res.data);
    });
  });
}

export default {
  fetchTaskList,
  createTaskList,
  updateTaskList
};
