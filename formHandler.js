let form = document.querySelector('form');
let dest = form.id == 'register-form'?'register':'login'; 
form.addEventListener('submit', event => fetchit(event, dest));

function fetchit(e, route = '') {
    e.preventDefault();
    let formData = new FormData(e.target);
    fetch('/restful/' + route, {
        method: 'POST',
        body: formData
    })
    .then(res => res.text())
    .then(res => {console.log(res); return res})
    .then(obj => {
        if(obj.message != null) {
            alertMessage(obj.message);
            return;
        }
        console.log(obj);
    })
    .catch(err => console.error(err))
    return false;
}

function alertMessage(msg) {
    if (msg == undefined) {return}
    let alert = document.createElement('p');
    alert.className = "alert alert-danger t-0 w50 block-center";
    alert.style = "position: absolute; top: 0; width: 50%; min-width: 200px; max-width: 1000px; text-align: center;"
    alert.append(document.createTextNode(msg));
    document.body.append(alert);
    setTimeout(() => {
        document.querySelector(".alert-danger").remove();
    }, 3000);
}