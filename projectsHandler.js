let projects = [];
fetch('/restful/projects')
.then(res => res.json())
.then(data => projects = data)
.then(console.log(projects))