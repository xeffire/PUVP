let timeouts = [];
let tasks = [];
let tasksContainer = document.getElementById('tasks-container');
let cardsContainer = document.getElementById('cards-container');
let tasksNew = document.getElementById('tasks-new');
var url_string = location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

function getTasks() {
    fetch(`/restful/tasks?id=${id}`)
    .then(res => {
        if (res.status === 204) {return []}
        return res.json()
    })
    .then(data => {
        tasks = data
    })
    .then(cardBuilder)
    .then(toggleDisplay);
}
getTasks();

function cardBuilder() {
    let fragment = document.createElement('template');
    for (let obj of tasks) {
        fragment.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="card border-1 border-primary my-3 p-0 h-100" style="width: 100%;">
                <div class="card-header bg-primary d-flex justify-content-between">
                    <h4>${obj.state == 0?'Daromas':'Padarytas'}</h4>
                    <a class="text-white" data-id="${obj.id}" href="#edit_task" data-toggle="modal"><i class="bi bi-pencil-square" data-id="${obj.id}"></i></a>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${obj.name}</h5>
                    <p class="card-text">${obj.description}</p>
                    <a href="tasks.html?id=${obj.id}" class="btn btn-outline-primary align-self-end mt-auto">Show tasks</a>
                </div>
            </div>
        </div>
        `;
    }
    for (let child of [...cardsContainer.children]) {
        child.remove();
    }
    cardsContainer.appendChild(fragment.content);
    let editLinks = [...cardsContainer.querySelectorAll('a[data-id]')];
    for (let link of editLinks) {
        link.addEventListener('click', handleEditData)
    }
}

function toggleDisplay() {
    if (tasks.length < 1) {
        tasksContainer.classList.add('d-none');
        tasksNew.classList.remove('d-none');
        return;
    }
    tasksContainer.classList.remove('d-none');
    tasksNew.classList.add('d-none');
}


// document.getElementById('new-task-form').addEventListener('submit', addNewtask);
function addNewtask(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    fetch('/restful/tasks/create', {
        method: 'POST',
        body: form
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
      alertMessage(res.body.response, 'success');
      e.target.reset();
      document.getElementById('close-new-task').click();
      getTasks();
    })
    .catch((err) => console.error(err));
    return false;

}

let box = document.createElement("div");

box.style =
  "position: fixed; z-index: 1200; top: 0; width: 50%; min-width: 200px; left: 50%; transform: translateX(-50%)";
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
  alert.className = `alert alert-${color} msg-${key}`;
  alert.style = "text-align: center; margin: 0; z-index: 1101;";
  alert.append(document.createTextNode(msg));
  box.append(alert);
  const timeout = setTimeout(() => {
    document.querySelector(`.msg-${key}`).remove();
  }, 3000);
  timeouts[key] = timeout;
}

function deleteTask(id) {
    fetch(`/restful/tasks/delete?id=${id}`)
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
      alertMessage(res.body.response, 'success');
      document.getElementById('edit-task-form').reset();
      document.getElementById('close-edit-task').click();
      getTasks();
    })
    .catch((err) => console.error(err));
    return false;
}

function handleEditData(e) {
    let id = e.target.getAttribute('data-id');
    let editCard = document.getElementById('edit_task');
    let obj = tasks.filter(item => item.id == id)[0];
    editCard.querySelector('#task-name').value = obj.name;
    editCard.querySelector('#task-description').value = obj.description;
    editCard.querySelector('#tasks_total').innerText = obj.total;
    editCard.querySelector('#tasks_undone').innerText = obj.total_done;
    let oldtaskSave = editCard.querySelector('#task-save');
    let newtaskSave = oldtaskSave.cloneNode(true);
    oldtaskSave.parentNode.replaceChild(newtaskSave, oldtaskSave);
    let oldDelete = editCard.querySelector('#delete');
    let newDelete = oldDelete.cloneNode(true);
    oldDelete.parentNode.replaceChild(newDelete, oldDelete);
    newtaskSave.addEventListener('click', () => {updateTask(id)});
    newDelete.addEventListener('click', () => {deleteTask(id)});
}

function updateTask(id) {
    console.log(id);
    let editForm = new FormData(document.getElementById('edit-task-form'));
    fetch(`/restful/tasks/update?id=${id}`, {
        method: 'POST',
        body: editForm})
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
      alertMessage(res.body.response, 'success');
      document.getElementById('edit-task-form').reset();
      document.getElementById('close-edit-task').click();
      getTasks();
    })
    .catch((err) => console.error(err));
    return false;
}

function showEmail() {
    let span = document.getElementById('navbar-email');
    fetch(`/restful/user`)
    .then((res) => res.json())
    .then((res) => {
      span.innerText = res[0].email;
    })
    .catch((err) => console.error(err));
}

function logout() {
    fetch(`/restful/logout`)
    .then( () => {location.href = '/'})
    .catch((err) => console.error(err));
}
document.getElementById('logout').addEventListener('click', logout);
showEmail();