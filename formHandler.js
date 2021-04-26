let timeouts = [];
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
            alertMessage(res.body[key], 'danger', key);
          });
        return;
      }
      if (route === 'login') {
        window.location.href = '/main.html';
        return;
      }
      alertMessage(res.body.response, 'success');
      e.target.reset();
      document.getElementById('login-form-link').click();
    })
    .catch((err) => console.error(err));
  return false;
}

let box = document.createElement("div");

box.style =
  "position: fixed; z-index: 1200; top: 0; width: 50%; min-width: 200px; left: 50%; transform: translateX(-50%)";
document.body.appendChild(box);

export function alertMessage(msg, color, key) {
  if (msg == undefined) {
    return;
  }
  let existingAlert = document.querySelector(`.msg-${key}`);
  if (existingAlert != null) {
    existingAlert.remove();
    clearTimeout(timeouts[key]);
  }
  let alert = document.createElement("p");
  alert.className = `alert alert-${color} msg-${key}`;
  alert.style = "text-align: center; margin: 0; z-index: 1101;";
  alert.append(document.createTextNode(msg));
  box.append(alert);
  const timeout = setTimeout(() => {
    document.querySelector(`.msg-${key}`).remove();
  }, 3000);
  timeouts[key] = timeout;
}
