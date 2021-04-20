<?php

namespace Core;

use \Models\User;

class Auth {

  public static function isLogged() {

    $user = new User;

    if (!isset($_COOKIE['token'])) {
      return false;
    } elseif (isset($_COOKIE['token']) && !$user->existsByToken($_COOKIE['token'])) {
      return false;
    } else {
      return true;
    }
  }

}