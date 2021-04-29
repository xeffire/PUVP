<?php

namespace Controllers;

use \Models\Login;
use \Core\Helpers;

class LoginController {
  
  private $email;
  private $password;

  public function login() {

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      $this->email = isset($_POST['email']) ? $_POST['email'] : null;
      $this->password = isset($_POST['password']) ? $_POST['password'] : null;

      $loginModel = new Login;
    
      $e = [];
    
      if (empty($this->email)) {
        $e[1] = "Neįvedėte el. pašto.";
      }

      if (empty($this->password)) {
        $e[2] = "Neįvedėte slaptažodžio.";
      }
    
      if (!empty($this->email) && !$loginModel->userExists($this->email)) {
        $e[4] = "Vartotojas šiuo el. paštu neegzistuoja.";
      }

      if (!empty($this->password) && $loginModel->userExists($this->email) && !password_verify($this->password, $loginModel->getPassword($this->email))) {
        $e[5] = "Neteisingas slaptažodis.";
      }
    
      if (!empty($e)) {

        Helpers::response(400, $e);
        
      } else {

        $loginModel->loginUser($this->email);
        
        Helpers::response(200, ["response" => "Prisijungta sėkmingai."]);

      }
    
    }

  }

}