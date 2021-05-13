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

    

    event
    .dataTransfer
    .clearData();
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
    .then(() => {
      document.getElementById("edit-task-form").reset();
      document.getElementById('edit-task-form').querySelectorAll('input[type="radio"]').forEach(input => input.removeAttribute('checked'));
    })
    .catch((err) => console.error(err));
  return false;
}

function handleEditData() {
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
}
