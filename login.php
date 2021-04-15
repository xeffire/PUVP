<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
      rel="stylesheet"
      id="bootstrap-css"
    />
    <link rel="stylesheet" href="style.css" />
    <title>Prisijungimas</title>
    <script src="formHandler.js" defer></script>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div class="panel panel-login">
            <div class="panel-heading">
              <div class="row">
                <div class="col-xs-6">
                  <a href="#" class="active" id="login-form-link">Prisijungti</a>
                </div>
                <div class="col-xs-6">
                  <a href="register.php" id="register-form-link">Registruotis</a>
                </div>
              </div>
              <hr />
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-lg-12">
                  <form
                    id="login-form"
                    action=""
                    method="post"
                    role="form"
                    style="display: block"
                  >
                    <div class="form-group">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        tabindex="1"
                        class="form-control"
                        placeholder="Vartotojo vardas"
                        value=""
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        tabindex="2"
                        class="form-control"
                        placeholder="Slaptažodis"
                      />
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                          <input
                            type="submit"
                            name="login-submit"
                            id="login-submit"
                            tabindex="4"
                            class="form-control btn btn-login"
                            value="Prisijungti"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-lg-12">
                          <div class="text-center">
                            <a
                              href="register.php"
                              tabindex="5"
                              class="forgot-password"
                              >Pamiršai slaptažodį?</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
