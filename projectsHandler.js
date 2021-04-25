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
fetch('/restful/projects')
.then(res => res.json())
.then(data => projects = data)
.then(toggleDisplay())
.then(cardBuilder());

function cardBuilder() {
    // let card, head, body, desc = document.createElement('div');
    let fragment = document.createElement('template');
    for (let obj of projects) {
        fragment.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="card border-1 border-primary my-3 p-0" style="width: 100%;">
                <div class="card-header bg-primary d-flex justify-content-between">
                    <h4>${obj.state == 0?'Daromas':'Padarytas'}</h4>
                    <i class="bi bi-pen"></i>
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
    document.getElementById('projects-container').appendChild(fragment.content);
}

cardBuilder();

function toggleDisplay() {
    if (projects.length < 1) {
        document.getElementById('projects-container').classList.add('d-none');
        document.getElementById('projects-new').classList.remove('d-none');
        return;
    }
    document.getElementById('projects-container').classList.remove('d-none');
    document.getElementById('projects-new').classList.add('d-none');
}