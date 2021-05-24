function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.currentTarget.id);
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
    updateTask(id);
    

    event
    .dataTransfer
    .clearData();
}

function updateTask(id) {
  const priority = ["low", "medium", "high"];
  const status = ["todo-container", "in-progress-container", "done-container"];
  let task = document.getElementById(id);
  const url = new URL(location.href);
  const projectId = url.searchParams.get("id");
  let updateForm = new FormData();
  updateForm.append('id', id.replace(/task-/, ''));
  updateForm.append('project_id', projectId);
  updateForm.append('name', task.querySelector('#task-name').textContent.replace(/^#(\d)+\s/, ''));
  updateForm.append('description', task.querySelector('#task-description').textContent);
  updateForm.append('priority', priority.indexOf(task.className.match(/low|medium|high/)[0]));
  console.log(task.className.match(/low|medium|high/)[0]);
  console.log(task.closest('.board-column').id);
  updateForm.append('status', status.indexOf(task.closest('.board-column').id));
  console.log([...updateForm]);

  fetch(`/restful/tasks/update?id=${id.replace(/task-/, '')}`, {
    method: "POST",
    body: updateForm,
  })
}

function handleEditData(id) {
  const priority = ["low", "medium", "high"];
  const status = ["to-do", "in-progress", "done"];
  const editCard = document.getElementById("edit-task");
  const obj = tasks.filter((item) => item.id == id)[0];
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
}
