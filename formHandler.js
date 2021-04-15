let form = document.querySelector("form");
let dest = form.id == "register-form" ? "register" : "login";
form.addEventListener("submit", (event) => fetchit(event, dest));

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
            alertMessage(res.body[key], 'danger');
          });
        return;
      }
      alertMessage(res.body.response, 'success');
      if (route === 'login') {
          window.location.href = '/main.php'
      }
    })
    .catch((err) => console.error(err));
  return false;
}

let box = document.createElement("div");

box.style =
  "position: absolute; top: 0; width: 50%; min-width: 200px; max-width: 1000px;";
document.body.appendChild(box);

function alertMessage(msg, color) {
  if (msg == undefined) {
    return;
  }
  let alert = document.createElement("p");
  alert.className = "alert alert-" + color;
  alert.style = "text-align: center;";
  alert.append(document.createTextNode(msg));
  box.append(alert);
  setTimeout(() => {
    document.querySelector(".alert-danger").remove();
  }, 3000);
}
