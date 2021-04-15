<?php

namespace Models;

use \Core\Database;

class Register extends Database {

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

  public function createUserAccount($email, $hashedPassword) {
    
    $query = 'INSERT INTO users(email, `password`) VALUES(:email, :password)';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashedPassword);
    $stmt->execute();

    echo json_encode(["response" => "Registracija sėkminga."]);

    //generate random token
    // $token = openssl_random_pseudo_bytes(16);
    // $binaryToHex = bin2hex($token);

  }

}