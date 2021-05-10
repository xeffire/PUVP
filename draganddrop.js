function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);

    event
    .currentTarget
    .style
    .opacity = 0.6;
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
      .getData('text');

    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    const dropzone = event.target; //kazkodel ima kitos korteles body arba headeri, ten kur nutempi, o ne event targeta
    console.log(dropzone); 
    dropzone.appendChild(draggableElement);

    event
    .dataTransfer
    .clearData();
}