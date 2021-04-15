<?php

namespace Models;

use \Core\Database;

class Login extends Database {

  public function userExists($email) {

    $query = 'SELECT * FROM users WHERE email = :email';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();


    if ($stmt->rowCount() <= 0) {
      return false;
    } else {
      return true;
    }

  }

  public function getPassword($email) {

    $query = 'SELECT `password` FROM users WHERE `email` = :email';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    return $stmt->fetchColumn();

  }

}