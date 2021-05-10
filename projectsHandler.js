import {Alert, logout, showEmail} from './utils/utils.js';
let msg = new Alert();

if (document.cookie.indexOf('token=') === -1) {
  logout();
}

let projects = [];
let projectsContainer = document.getElementById('projects-container');
let cardsContainer = document.getElementById('cards-container');
let projectsNew = document.getElementById('projects-new');

function getProjects() {
    fetch('/restful/projects')
    .then(res => {
        if (res.status === 204) {return []}
        return res.json()
    })
    .then(data => {
        projects = data
    })
    .then(cardBuilder)
    .then(toggleDisplay);
}

function cardBuilder() {
    let fragment = document.createElement('template');
    for (let obj of projects) {
        fragment.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="card border-1 border-primary my-3 p-0" style="width: 100%;">
                <div class="card-header bg-primary d-flex justify-content-between">
                    <h4>${obj.total_done == 0 && obj.total != 0?'Padarytas':'Daromas'}</h4>
                    <a class="text-white" data-id="${obj.id}" href="#edit_project" data-toggle="modal"><i class="bi bi-pencil-square" data-id="${obj.id}"></i></a>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title dissolve2" style="line-height: 1.45rem;">${obj.name}</h5>
                    <p class="card-text dissolve4">${obj.description}</p>
                    <a href="tasks.html?id=${obj.id}" class="btn btn-outline-primary align-self-end mt-auto">Rodyti užduotis</a>
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
    if (projects.length < 1) {
        projectsContainer.classList.add('d-none');
        projectsNew.classList.remove('d-none');
        return;
    }
    projectsContainer.classList.remove('d-none');
    projectsNew.classList.add('d-none');
}


function addNewProject(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    fetch('/restful/projects/create', {
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
            msg.new(res.body[key], 'danger', key);
          });
        return;
      }
      msg.new(res.body.response, 'success');
      e.target.reset();
      document.getElementById('close-new-project').click();
      getProjects();
    })
    .catch((err) => console.error(err));
    return false;

}

function deleteProject(id) {
    if (!confirm('Ar tikrai norite ištrinti projektą?')) {
      return;
    }
    fetch(`/restful/projects/delete?id=${id}`)
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
      msg.new(res.body.response, 'success');
      document.getElementById('edit-project-form').reset();
      document.getElementById('close-edit-project').click();
      getProjects();
    })
    .catch((err) => console.error(err));
    return false;
}

function handleEditData(e) {
    let id = e.target.getAttribute('data-id');
    let editCard = document.getElementById('edit_project');
    let obj = projects.filter(item => item.id == id)[0];
    editCard.querySelector('#project-name').value = obj.name;
    editCard.querySelector('#project-description').value = obj.description;
    editCard.querySelector('#tasks_total').innerText = obj.total;
    editCard.querySelector('#tasks_undone').innerText = obj.total_done;
    let oldProjectSave = editCard.querySelector('#project-save');
    let newProjectSave = oldProjectSave.cloneNode(true);
    oldProjectSave.parentNode.replaceChild(newProjectSave, oldProjectSave);
    let oldDelete = editCard.querySelector('#delete');
    let newDelete = oldDelete.cloneNode(true);
    oldDelete.parentNode.replaceChild(newDelete, oldDelete);
    newProjectSave.addEventListener('click', () => {updateProject(id)});
    newDelete.addEventListener('click', () => {deleteProject(id)});
}

function updateProject(id) {
    console.log(id);
    let editForm = new FormData(document.getElementById('edit-project-form'));
    fetch(`/restful/projects/update?id=${id}`, {
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
            msg.new(res.body[key], 'danger', key);
          });
        return;
      }
      msg.new(res.body.response, 'success');
      document.getElementById('edit-project-form').reset();
      document.getElementById('close-edit-project').click();
      getProjects();
    })
    .catch((err) => console.error(err));
    return false;
}

class Filter{
  constructor(searchGroup, tagSpan) {
    this.input = searchGroup.querySelector('input');
    console.log(this.input);
    searchGroup.querySelector('button').addEventListener('click', this.add.bind(this));
    this.tagSpan = tagSpan;
    this.tags = [];
  }

  add() {
    console.log(this.input);
    let tag = document.createElement('span');
    tag.className = 'badge rounded-pill bg-primary fs-4';
    tag.innerText = this.input.value;
    this.tagSpan.appendChild(tag);
    this.tags.push(tag);
    this.input.value = '';
  }

  remove(e) {
    e.target.remove();
  }
}

let filter = new Filter(document.querySelector('#search'), document.querySelector('#tags-span'));
filter.add();

document.getElementById('new-project-form').addEventListener('submit', addNewProject);
document.getElementById('logout').addEventListener('click', logout);

showEmail();
getProjects();