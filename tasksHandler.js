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
            id="task-${obj.id}" >

            <div class="card-header bg-white d-flex justify-content-between dissolve2">
              <h6 id="task-name" class="text-dark ${
                obj.state == 2 ? "fw-light italic" : ""
              }"><span id="task-id">#${obj.id}</span> ${obj.name}</h6>
              <a class="text-dark" data-id="${
                obj.id
              }" href="#edit-task" data-toggle="modal"><i class="bi bi-pencil-square" data-id="${
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
    let card = link.closest('.card');
    card.addEventListener('dragstart', onDragStart);
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
  if (!confirm("Ar tikrai norite i??trinti u??duot???")) {
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
  const editCard = document.getElementById("edit-task");
  const obj = tasks.filter((item) => item.id == taskID)[0];
  editCard.querySelector("#task-name").value = obj.name;
  editCard.querySelector("#task-description").value = obj.description;
  editCard
    .querySelector(`#${priority[obj.priority]}`)
    .setAttribute("checked", "true");
  editCard
    .querySelector(`#${status[obj.status]}`)
    .setAttribute("checked", "true");
  editCard.querySelector("#date-create").innerText = obj.created;
  editCard.querySelector("#date-update").innerText = obj.updated;
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

function updateTask(id, thruModal=true, status=null) {
  let editForm;
  if (thruModal) {
    editForm = new FormData(document.getElementById("edit-task-form"));
  } else {
    let task = tasks.filter(task => task.id == id);
    editForm = new FormData();
    for (const key in task) {
      editForm.append(key, task[key]);
    }
    editForm.set('status', )
    console.log([...editForm]);
  }
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
}

function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  event.preventDefault();
  const id = event
    .dataTransfer
    .getData('text/plain');

  const draggableElement = document.getElementById(id);
  const dropzone = event.currentTarget; //fixed yaaaay ????????????
  dropzone.appendChild(draggableElement);
  let task = tasks.filter(task => task.id == id.replaceAll(/\D/g, ''))[0];
  task.status = ['todo-container', 'in-progress-container', 'done-container'].indexOf(dropzone.id);
  let form = new FormData();
  for (let key in task) {
    form.append(key, task[key]);
  }

  fetch(`/restful/tasks/update?id=${task.id}`, {
    method: "POST",
    body: form
  });

  document.querySelector('#edit-task-form').reset();

  event
  .dataTransfer
  .clearData();
}

class Filter{
  constructor(searchGroup, tagSpan) {
    this.input = searchGroup.querySelector('input');
    console.log(this.input);
    searchGroup.querySelector('button').addEventListener('click', this.add.bind(this));
    this.input.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
          searchGroup.querySelector('button').click();
      }
    });
    this.tagSpan = tagSpan;
    this.tags = [];
    this.nameList = {};
    this.names = [];
  }

  add() {
    console.log(this.input);
    let keyword = this.input.value.toUpperCase();
    let tagText = this.input.value;
    console.log(keyword);
    if (keyword === "" || this.tags.includes(keyword)) {
      this.input.value = '';
      return;
    }
    console.log(this.tags);
    let tag = document.createElement('span');
    tag.className = 'badge rounded-pill bg-primary badge-outline fs-5 ms-1';
    tag.innerText = tagText;
    let x = document.createElement('i');
    x.className = 'bi bi-x ms-2 pointer';
    tag.appendChild(x);
    x.style.cursor = 'pointer';
    x.addEventListener("click", (event) => {
      event.target.parentNode.remove();
      let index = this.tags.indexOf(keyword);
      this.tags.splice(index, 1);
      filter.filter();
    });
    this.tagSpan.appendChild(tag);
    this.tags.push(keyword);
    this.input.value = '';
    this.getNames();
    this.filter();
  }

  getNames() {
    const titles = [...document.querySelectorAll(".card-header:first-child h6")];
    console.log(titles);
    this.names = titles.map(
      (item) => item.innerText.toUpperCase()
    );
    console.log(this.names);
    this.names.forEach((key, i) => (this.nameList[key] = titles[i]));
    console.log(this.nameList);
  };

  filter(){
    let isAlert = document.querySelector("#tasks-container > p");
    if (isAlert) {
      isAlert.remove();
    }
    document.getElementById("task-cards-container").classList.remove("d-none");
    const cards = [...document.querySelectorAll(".card")];
    console.log(cards);
    cards.forEach(card=>{
      card.classList.remove("d-none");
    });
    this.tags.forEach((tag)=>this.names.forEach((nam)=>
      {if(nam.search(tag)==-1){
        console.log(tag);
        this.nameList[nam].parentElement.parentElement.classList.add("d-none");
      }
    }
    ));
    if (!document.querySelector(".card:not(.d-none)")) {
      document.getElementById("task-cards-container").classList.add("d-none");
      let p = document.createElement("p");
      p.className = "alert alert-warning mt-3";
      p.id = "msg";
      p.innerText = "Pagal paie??kos kriterijus u??duo??i?? nerasta!";
      document.querySelector("#tasks-container").appendChild(p);
      console.log(p);
    }
  };
  

  remove(e) {
    e.target.remove();
  }
  
  refreshFilterables() {
  }

}

let filter = new Filter(document.querySelector('#task-search'), document.querySelector('#task-tags-span'));


function exports(exportable) {
  fetch('/restful/'+exportable+'?id='+id)
  .then(res => {
      return res.json();
  })
  .then(data => {
    let cvs = '';
    console.log(data);
    for(let field in data[0]) {
      cvs += field + '|'
    }
    cvs = cvs.slice(0, -1) + '\r\n';
    for(let row of data) {
      for(let field in row) {
        cvs += row[field] + '|';
      }
      cvs = cvs.slice(0, -1) + '\r\n';
    }
    return cvs;
  })
  .then(data => download(exportable + '-' + Math.floor(Date.now() / 100) + '.csv', data));

  function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
}
document.querySelector('#export').addEventListener('click', exports.bind(this, 'tasks'));
document.querySelector('#todo-container').addEventListener('dragover', onDragOver);
document.querySelector('#todo-container').addEventListener('drop', onDrop);
document.querySelector('#in-progress-container').addEventListener('dragover', onDragOver);
document.querySelector('#in-progress-container').addEventListener('drop', onDrop);
document.querySelector('#done-container').addEventListener('dragover', onDragOver);
document.querySelector('#done-container').addEventListener('drop', onDrop);

fetch('/restful/projectname?id='+id)
  .then(res => res.json())
  .then(res => document.getElementById('project-name-heading').textContent = res[0]['name']);
