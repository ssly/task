import axios from 'axios';

function getList() {
  // let url = 'https://lius.me/api/task/manager';

  return new Promise((resolve, reject) => {
    // axios.get(url).then(response => {
    //   resolve(response.data);
    // });

    resolve([]);
  })
}

export { getList };
export default axios;
