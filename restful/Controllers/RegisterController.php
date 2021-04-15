<?php

namespace Controllers;

use \Models\Register;

class RegisterController {
  
  private $email;
  public $password;

  public function register() {

    if (isset($_POST['email']) || isset($_POST['password'])) {

      $this->email = isset($_POST['email']) ? $_POST['email'] : null;
      $this->password = isset($_POST['password']) ? $_POST['password'] : null;

      $registerModel = new Register;
    
      $e = [];
    
      if (!$this->email) {
        $e[1] = "Neįvedėte el. pašto.";
      }

      if (!$this->password) {
        $e[2] = "Neįvedėte slaptažodžio.";
      }
    
      if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
        $e[3] = "Netinkamas el. paštas.";
      }
    
      if ($registerModel->userExists($this->email)) {
        $e[4] = "Vartotojas šiuo el. paštu jau užregistruotas.";
      }

      if (strlen($this->email) < 10) {
        $e[5] = "El. paštas per trumpas.";
      }

      if (strlen($this->password) < 5) {
        $e[6] = "Slaptažodis per trumpas.";
      }
      
      if (strlen($this->email) > 150) {
        $e[7] = "El. paštas per ilgas.";
      }

      if (strlen($this->password) > 255) {
        $e[8] = "Slaptažodis per ilgas.";
      }
    
      if (!empty($e)) {
        http_response_code(400);
        echo json_encode($e);
      } else {
        http_response_code(200);

        $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);

        $registerModel->createUserAccount($this->email, $hashedPassword);

      }
    
    }

  }

}