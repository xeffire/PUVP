# /register

> Priima post su body:
name,
password,
confirm-password

- 400, ["number" => "Error message"]
- 200, "response" => "Registracija sėkminga."

# /login

> Priima post su body:
name,
password

- 400, ["number" => "Error message"]
- 200, "response" => "Prisijungta sėkmingai"

# /logout
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 200, ["response" => "Sėkmingai atsijungėte."]

# /user
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 200, [*user data (id, email)*]

# /projects
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 204, [] *nėra duomenų*
- 200, [*projects data + total tasks and tasks done*]

# /projects/create
*Auth required (token in cookie must be active)*

> Priima post su body:
name,
description

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas sėkmingai sukurtas."

# /projects/delete?id=PROJECT_ID
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas ištrintas."

# /projects/update?id=PROJECT_ID
*Auth required (token in cookie must be active)*

> Priima post su body:
name,
description

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Projektas atnaujintas."


# /tasks?id=PROJECT_ID
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 204, [] *nėra duomenų*
- 200, [*all tasks of project*]

# /tasks/create?id=PROJECT_ID
*Auth required (token in cookie must be active)*

> Priima post su body:
name,
description,
priority

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis sėkmingai sukurta."

# /tasks/delete?id=TASK_ID
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis ištrinta."

# /tasks/update?id=TASK_ID
*Auth required (token in cookie must be active)*

> Priima post su body:
name,
description,
priority,
status

- 403, "response" => "Prisijungimas nebegalioja."
- 400, ["number" => "Error message"]
- 200, "response" => "Užduotis atnaujinta."