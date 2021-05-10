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
    console.log(event);

    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    const dropzone = event.currentTarget; //fixed yaaaay 👍👍👍
    console.log(dropzone); 
    dropzone.appendChild(draggableElement);

    event
    .dataTransfer
    .clearData();
}
