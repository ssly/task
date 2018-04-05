import axios from '../js/ajax';
const HOST = 'http://127.0.0.1:8678';

function signout() {
  return new Promise((resolve, reject) => {
    axios.get(`${HOST}/user/signout`).then(res => {
      if (res.data.success) {
        resolve(res.data.data);
      }
    });
  });
}

export { signout };
