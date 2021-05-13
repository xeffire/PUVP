import {Alert, logout, showEmail} from './utils/utils.js';

if (document.cookie.indexOf('token=') === -1) {
  logout();
}
let msg = new Alert();

let tasks = [];
let tasksContainer = document.getElementById("tasks-container");
let tasksNew = document.getElementById("tasks-new");
let url = new URL(location.href);
let id = url.searchParams.get("id");

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
      console.log(tasks);
    })
    .then(cardBuilder)
    .then(toggleDisplay);
}

function cardBuilder() {
  let priorityColor = ["low", "medium", "high"];
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
          <div 
            class="card mb-1 py-2 ${priorityColor[obj.priority]}" 
            style="cursor: move;"
            draggable="true" 
            id="task-${obj.id}" 
            ondragstart="onDragStart(event);" 
            ondragend="onDragEnd(event);">

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
            msg.new(res.body[key], "danger", key);
          });
        return;
      }
      msg.new(res.body.response, "success");
      e.target.reset();
      document.getElementById("close-new-task").click();
      getTasks();
    })
    .catch((err) => console.error(err));
  return false;
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
            msg.new(res.body[key], "danger", key);
          });
        return;
      }
      msg.new(res.body.response, "success");
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
            msg.new(res.body[key], "danger", key);
          });
        return;
      }
      msg.new(res.body.response, "success");
      document.getElementById("edit-task-form").reset();
      document.getElementById('edit-task-form').querySelectorAll('input[type="radio"]').forEach(input => input.removeAttribute('checked'));
      document.getElementById("close-task").click();
      getTasks();
    })
    .catch((err) => console.error(err));
  return false;
}

document.getElementById("new-task-form").addEventListener("submit", addNewtask);
document.getElementById("logout").addEventListener("click", logout);
showEmail();
getTasks();

function onDragStart(event) {
  event
    .dataTransfer
    .setData('text/plain', event.currentTarget.id);
  console.log(event.dataTransfer.getData('text'));
  event
  .currentTarget
  .style
  .opacity = 1;
}

function onDragEnd(event) {
  
  event
  .currentTarget
  .style
  .opacity = 1;
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  
  const id = event
    .dataTransfer
    .getData('text/plain');

  const draggableElement = document.getElementById(id);
  const dropzone = event.currentTarget; //fixed yaaaay 👍👍👍
  dropzone.appendChild(draggableElement);
  console.log(id.replaceAll(/\D/g, ''));
  let task = tasks.filter(task => task.id == id.replaceAll(/\D/g, ''))[0];
  task.priority = ['todo-container', 'in-progress-container', 'done-container'].indexOf(dropzone.id);
  let form = new FormData();
  for (let key in task) {
    form.append(key, task[key]);
  }

  fetch(`/restful/tasks/update?id=${task.id}`, {
    method: "POST",
    body: form
  })
  .then(res => res.json().then(res => console.log(res)))

  event
  .dataTransfer
  .clearData();
}


