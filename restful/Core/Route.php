<?php

namespace Core;

use \Core\Auth;

class Route {

  private $class;

  public static function get($route, $current, $className, $method, $auth = null){
    if ($route == $current && $auth != null) {
      if (Auth::isLogged()) {
        $class = new $className;
        $class->$method();
      } else {
        http_response_code(403);
        echo json_encode(["response" => "Prisijungimas nebegalioja."]);
      }
    } elseif ($route == $current && $auth == null) {
      $class = new $className;
      $class->$method();
    }
  }

}