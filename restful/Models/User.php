<?php

namespace Models;

use \Core\Database;

class User extends Database {

  public function existsByToken($token) {

    $query = 'SELECT id FROM users WHERE token = :token';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    return ($stmt->rowCount() <= 0) ? false : true;

  }

  public function aboutUserByToken($token) {

    $query = 'SELECT id, email FROM users WHERE token = :token';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    return $stmt->fetchAll(\PDO::FETCH_ASSOC);

  }

}