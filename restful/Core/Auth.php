<?php

namespace Core;

class Auth {

  public static function isLogged() {
    if (!isset($_COOKIE['token'])) {
      return false;
    } else {
      return true;
    }
  }

}