<?php

namespace Controllers;

use \Core\Helpers;
use \Core\Auth;
use \Models\User;

class UserController {

  public function info() {

    $userModel = new User;

    $userInfo = $userModel->aboutUserByToken($_COOKIE['token']);

    Helpers::response(200, $userInfo);

  }

  public function logout() {

    setcookie('token', $_COOKIE['token'], time()-60*60, "/");

    Helpers::response(200, ["response" => "Sėkmingai atsijungėte."]);

  }

}