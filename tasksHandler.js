if (document.cookie.indexOf('token=') === -1) {
  logout();
}

let timeouts = [];
let tasks = [];
let tasksContainer = document.getElementById("tasks-container");
let tasksNew = document.getElementById("tasks-new");
var url_string = location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

function getTasks() {
  fetch(`/restful/tasks?id=${id}`)
    .then((res) => {
      if (res.status === 204) {
        return [];
      }
      return res.json();
    })
    .then((data) => {
      tasks = data;
    })
    .then(cardBuilder)
    .then(toggleDisplay);
}
getTasks();

function cardBuilder() {
  let priorityColor = ["#28A745", "#FFC107", "#DC3545"];
  let groups = [
    tasks.filter((item) => item.status == 0),
    tasks.filter((item) => item.status == 1),
    tasks.filter((item) => item.status == 2),
  ];
  ["todo-container", "in-progress-container", "done-container"].forEach(
    (val, i) => {
      let fragment = document.createElement("template");
      for (let obj of groups[i]) {
        fragment.innerHTML += `
          <div class="card mb-1 py-2" style="border-left: 4px solid ${
            priorityColor[obj.priority]
          };">
            <div class="card-header bg-white d-flex justify-content-between dissolve2">
              <h6 id="task-name" class="text-dark ${
                obj.state == 2 ? "fw-light italic" : ""
              }"><span id="task_id">#${obj.id}</span> ${obj.name}</h6>
              <a class="text-dark" data-id="${
                obj.id
              }" href="#edit_task" data-toggle="modal"><i class="bi bi-pencil-square" data-id="${
          obj.id
        }"></i></a>
            </div>
            <div class="card-body py-1 dissolve3">
              <p id="task-description" class="${
                obj.state == 2 ? "fw-light italic" : ""
              }">${obj.description}</p>
            </div>
          </div>
          `;
      }
      const cont = document.querySelector(`#${val}`);
      for (let child of [...cont.children]) {
        child.remove();
      }
      cont.appendChild(fragment.content);
    }
  );
  let editLinks = document
    .querySelector("#task-cards-container")
    .querySelectorAll("a[data-id]");
  for (let link of editLinks) {
    link.addEventListener("click", handleEditData);
  }
}

function toggleDisplay() {
  if (tasks.length < 1) {
    tasksContainer.classList.add("d-none");
    tasksNew.classList.remove("d-none");
    return;
  }
  tasksContainer.classList.remove("d-none");
  tasksNew.classList.add("d-none");
}

document.getElementById("new-task-form").addEventListener("submit", addNewtask);
function addNewtask(e) {
  e.preventDefault();
  let form = new FormData(e.target);
  fetch(`/restful/tasks/create?id=${id}`, {
    method: "POST",
    body: form,
  })
    .then((res) =>
      res.json().then((data) => ({ body: data, status: res.status }))
    )
    .then((res) => {
      if (res.status === 400) {
        Object.keys(res.body)
          .filter((key) => key.match(/[0-9]/))
          .forEach((key) => {
            alertMessage(res.body[key], "danger", key);
          });
        return;
      }
      alertMessage(res.body.response, "success");
      e.target.reset();
      document.getElementById("close-new-task").click();
      getTasks();
    })
    .catch((err) => console.error(err));
  return false;
}

let box = document.createElement("div");

box.style = "z-index: 1200";
box.className = "position-fixed top-0 row start-0 end-0 justify-content-center";
document.body.appendChild(box);

function alertMessage(msg, color, key) {
  if (msg == undefined) {
    return;
  }
  let existingAlert = document.querySelector(`.msg-${key}`);
  if (existingAlert != null) {
    existingAlert.remove();
    clearTimeout(timeouts[key]);
  }
  let alert = document.createElement("p");
  alert.className = `alert alert-${color} msg-${key} col-12 col-md-6`;
  alert.style = "text-align: center; margin: 0; z-index: 1101;";
  alert.append(document.createTextNode(msg));
  box.append(alert);
  const timeout = setTimeout(() => {
    document.querySelector(`.msg-${key}`).remove();
  }, 3000);
  timeouts[key] = timeout;
}

function deleteTask(id) {
  if (!confirm("Ar tikrai norite ištrinti užduotį?")) {
    return;
  }

  fetch(`/restful/tasks/delete?id=${id}`)
    .then((res) =>
      res.json().then((data) => ({ body: data, status: res.status }))
    )
    .then((res) => {
      if (res.status === 400) {
        Object.keys(res.body)
          .filter((key) => key.match(/[0-9]/))
          .forEach((key) => {
            alertMessage(res.body[key], "danger", key);
          });
        return;
      }
      alertMessage(res.body.response, "success");
      document.getElementById("edit-task-form").reset();
      document.getElementById("close-task").click();
      getTasks();
    })
    .catch((err) => console.error(err));
  return false;
}

function handleEditData(e) {
  const priority = ["low", "medium", "high"];
  const status = ["to-do", "in-progress", "done"];
  const taskID = e.target.getAttribute("data-id");
  const editCard = document.getElementById("edit_task");
  const obj = tasks.filter((item) => item.id == taskID)[0];
  console.log(tasks.filter((item) => item.id == "12")[0]);
  editCard.querySelector("#task-name").value = obj.name;
  editCard.querySelector("#task-description").value = obj.description;
  editCard
    .querySelector(`#${priority[obj.priority]}`)
    .setAttribute("checked", "true");
  editCard
    .querySelector(`#${status[obj.status]}`)
    .setAttribute("checked", "true");
  editCard.querySelector("#date_create").innerText = obj.created;
  editCard.querySelector("#date_update").innerText = obj.updated;
  let oldtaskSave = editCard.querySelector("#task-edit");
  let newtaskSave = oldtaskSave.cloneNode(true);
  oldtaskSave.parentNode.replaceChild(newtaskSave, oldtaskSave);
  let oldDelete = editCard.querySelector("#delete-task");
  let newDelete = oldDelete.cloneNode(true);
  oldDelete.parentNode.replaceChild(newDelete, oldDelete);
  newtaskSave.addEventListener("click", () => {
    updateTask(taskID);
  });
  newDelete.addEventListener("click", () => {
    deleteTask(taskID);
  });
}

function updateTask(id) {
  let editForm = new FormData(document.getElementById("edit-task-form"));
  fetch(`/restful/tasks/update?id=${id}`, {
    method: "POST",
    body: editForm,
  })
    .then((res) =>
      res.json().then((data) => ({ body: data, status: res.status }))
    )
    .then((res) => {
      if (res.status === 400) {
        Object.keys(res.body)
          .filter((key) => key.match(/[0-9]/))
          .forEach((key) => {
            alertMessage(res.body[key], "danger", key);
          });
        return;
      }
      alertMessage(res.body.response, "success");
      document.getElementById("edit-task-form").reset();
      document.getElementById("close-task").click();
      getTasks();
    })
    .catch((err) => console.error(err));
  return false;
}

function showEmail() {
  let span = document.getElementById("navbar-email");
  fetch(`/restful/user`)
    .then((res) => res.json())
    .then((res) => {
      span.innerText = res[0].email;
    })
    .catch((err) => console.error(err));
}

function logout() {
  fetch(`/restful/logout`)
    .then(() => {
      location.href = "/";
    })
    .catch((err) => console.error(err));
}
document.getElementById("logout").addEventListener("click", logout);
showEmail();

// function projectName() {
//   fetch()
// }
