<?php

namespace Models;

use \Core\Database;

class Login extends Database
{

    public function userExists($email)
    {

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

    public function getPassword($email)
    {

        $query = 'SELECT `password` FROM users WHERE `email` = :email';

        $stmt = $this->connect()->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        return $stmt->fetchColumn();

    }

    public function loginUser($email)
    {

        //generate token
        $token = openssl_random_pseudo_bytes(32);
        $tokenBinaryToHex = bin2hex($token);

        //set token in db
        $query = 'UPDATE users SET token = :token WHERE email = :email';

        $stmt = $this->connect()->prepare($query);
        $stmt->bindParam(":token", $tokenBinaryToHex);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        //set cookie
        $arr_cookie_options = array(
            'expires' => time() + 60 * 60,
            'path' => '/',
            'domain' => '', // leading dot for compatibility or use subdomain
            'secure' => false, // or false
            'httponly' => false, // or false
            'samesite' => 'Lax', // None || Lax  || Strict
        );
        setcookie('token', $tokenBinaryToHex, $arr_cookie_options);
        // setcookie('token', $tokenBinaryToHex, time() + 60 * 60, "/", "", false, false);

    }

}
