<?php

namespace Core;

use \Core\Auth;
use \Core\Helpers;

class Route {

  private $class;

  public static function set($route, $className, $method, $auth = null){
    $current = Helpers::getCurrentRoute();

    $repeat = true;

    if ($route == $current && $auth != null && $repeat) {
      if (Auth::isLogged()) {
        $class = new $className;
        $class->$method();
        if ($current != "/logout") {
          setcookie('token', $_COOKIE['token'], time()+60*60, "/");
        }
        $repeat = false;
      } else {
        http_response_code(403);
        echo json_encode(["response" => "Prisijungimas nebegalioja."]);
      }
    } elseif ($route == $current && $auth == null && $repeat) {
      $class = new $className;
      $class->$method();
      $repeat = false;
    }
  }

}