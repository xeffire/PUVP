<?php

namespace Models;

use \Core\Database;

class User extends Database {

  public function existsByToken($token) {

    $query = 'SELECT id FROM users WHERE token = :token';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();
    
    if ($stmt->rowCount() <= 0) {
      return false;
    } else {
      return true;
    }

  }

}