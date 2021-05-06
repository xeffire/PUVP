import {Alert} from './utils/utils.js';
let msg = new Alert();


document.querySelector('#login-form').addEventListener("submit", (event) => fetchit(event, 'login'));
document.querySelector('#register-form').addEventListener("submit", (event) => fetchit(event, 'register'));

function fetchit(e, route = "") {
  e.preventDefault();
  let formData = new FormData(e.target);
  fetch("/restful/" + route, {
    method: "POST",
    body: formData,
  })
    .then((res) =>
      res.json().then((data) => ({ body: data, status: res.status }))
    )
    .then((res) => {
      if (res.status === 400) {
        Object.keys(res.body)
          .filter((key) => key.match(/[0-9]/))
          .forEach((key) => {
            msg.new(res.body[key], 'danger', key);
          });
        return;
      }
      if (route === 'login') {
        window.location.href = '/main.html';
        return;
      }
      msg.new(res.body.response, 'success');
      e.target.reset();
      document.getElementById('login-form-link').click();
    })
    .catch((err) => console.error(err));
  return false;
}