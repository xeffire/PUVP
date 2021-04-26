import {alertMessage} from './formHandler.js';

let projects = [
    {
        id: 1,
        name: 'name',
        description: 'description',
        state: 0
    },
    {
        id: 2,
        name: 'Anoter name',
        description: 'and another description',
        state: 1 
    },
    {
        id: 1,
        name: 'name',
        description: 'description',
        state: 0
    },
    {
        id: 2,
        name: 'Anoter name',
        description: 'and another description',
        state: 1 
    },
    {
        id: 1,
        name: 'name',
        description: 'description',
        state: 0
    },
    {
        id: 2,
        name: 'Anoter name',
        description: 'and another description',
        state: 1 
    },
    {
        id: 1,
        name: 'name',
        description: 'description',
        state: 0
    },
    {
        id: 2,
        name: 'Anoter name',
        description: 'and another description',
        state: 1 
    }
];
let projectsContainer = document.getElementById('projects-container');
let projectsNew = document.getElementById('projects-new');
fetch('/restful/projects')
.then(res => res.json())
.then(data => projects = data)
.then(toggleDisplay())
.then(cardBuilder());

function cardBuilder() {
    let fragment = document.createElement('template');
    for (let obj of projects) {
        fragment.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card border-1 border-primary my-3 p-0" style="width: 100%;">
                <div class="card-header bg-primary d-flex justify-content-between">
                    <h4>${obj.state == 0?'Daromas':'Padarytas'}</h4>
                    <a href="#edit_project" data-toggle="modal"><i class="bi bi-pen"></i></a>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${obj.name}</h5>
                    <p class="card-text">${obj.description}</p>
                    <a href="#" class="btn btn-outline-primary align-self-end">Show tasks</a>
                </div>
            </div>
        </div>
        `;
    }
    for (let child of [...projectsContainer.children]) {
        child.remove();
    }
    projectsContainer.appendChild(fragment.content);
}

cardBuilder();

function toggleDisplay() {
    if (projects.length < 1) {
        projectsContainer.classList.add('d-none');
        projectsNew.classList.remove('d-none');
        return;
    }
    projectsContainer.classList.remove('d-none');
    projectsNew.classList.add('d-none');
}


// document.getElementById('')
function addNewProject() {
    let form = new FormData(document.getElementById('new-project-form'));
    fetch('/restsful/projects', {
        method: 'POST',
        body: form
    })
    .then(res => res.json())
    .then(res => console.log(res.response))
    .catch(res => res.json().then(res => {
        Object.keys(res.body)
        .filter((key) => key.match(/[0-9]/))
        .forEach((key) => {
          alertMessage(res.body[key], 'danger', key);
        });
    }))

}