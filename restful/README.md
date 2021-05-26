# /register

> Priima post su body:
> name,
> password,
> confirm-password

- 400, ["number" => "Error message"]
- 200, "response" => "Registracija sėkminga."

# /login

> Priima post su body:
> name,
> password

- 400, ["number" => "Error message"]
- 200, "response" => "Prisijungta sėkmingai"

# /logout

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 200, ["response" => "Sėkmingai atsijungėte."]

# /user

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 200, [*user data (id, email)*]

# /projects

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 204, [] _nėra duomenų_
- 200, [*projects data + total tasks and tasks done*]

# /projects/create

_Auth required (token in cookie must be active)_

> Priima post su body:
> name,
> description

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas sėkmingai sukurtas."

# /projects/delete?id=PROJECT_ID

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas ištrintas."

# /projects/update?id=PROJECT_ID

_Auth required (token in cookie must be active)_

> Priima post su body:
> name,
> description

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas atnaujintas."

# /tasks?id=PROJECT_ID

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 204, [] _nėra duomenų_
- 200, [*all tasks of project + project_name*]

# /tasks/create?id=PROJECT_ID

_Auth required (token in cookie must be active)_

> Priima post su body:
> name,
> description,
> priority

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis sėkmingai sukurta."

# /tasks/delete?id=TASK_ID

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis ištrinta."

# /tasks/update?id=TASK_ID

_Auth required (token in cookie must be active)_

> Priima post su body:
> name,
> description,
> priority,
> status

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis atnaujinta."

# /taskname?id=TASK_ID

_Auth required (token in cookie must be active)_

- 403, "response" => "Prisijungimas nebegalioja."
- 204, [] _nėra duomenų_
- 200, [*task by id*]
