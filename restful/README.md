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

# /projects
*Auth required (token in cookie must be active)*

- 403, "response" => "Prisijungimas nebegalioja."
- 204, "response" => "Nėra duomenų."
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