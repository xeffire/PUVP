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
    console.log(dropzone.id);
    updateTask(id.replaceAll(/\D/g, ''), ['todo-container', 'in-progress-container', 'done-container'].indexOf(dropzone.id))
    event
    .dataTransfer
    .clearData();
}

function updateTask(id, status) {
  console.log(id +' '+status);
  let url = new URL(location.href);
  let projectId = url.searchParams.get("id");
  let editForm = new FormData();
  const task = document.querySelector(`#task-${id}`);
  editForm.append('id', id);
  editForm.append('name', task.querySelector('#task-name').innerText);
  editForm.append('description', task.querySelector('#task-description').innerText);
  editForm.append('priority', ['#28A745','#FFC107','rgb(220, 53, 69)'].indexOf(task.style.borderRightColor));
  editForm.append('status', status);
  fetch(`/restful/tasks/update?id=${id}`, {
    method: "POST",
    body: editForm,
  })
  .then(res => res.json())
  .then(res => console.log(res))
  return false;
}
