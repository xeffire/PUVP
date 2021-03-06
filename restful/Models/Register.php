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

  public function createUserAccount($email, $hashedPassword, $token) {
    
    $query = 'INSERT INTO users(email, `password`, token) VALUES(:email, :password, :token)';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashedPassword);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    // setcookie('token', $token, time()+60*60, "/");
    $arr_cookie_options = array(
      'expires' => time() + 60 * 60,
      'path' => '/',
      'domain' => '', // leading dot for compatibility or use subdomain
      'secure' => false, // or false
      'httponly' => false, // or false
      'samesite' => 'Lax', // None || Lax  || Strict
  );
  setcookie('token', $token, $arr_cookie_options);

    return ["response" => "Registracija sėkminga."];

  }

}