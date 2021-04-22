<?php

namespace Core;

use \Core\Auth;
use \Core\Helpers;

class Route {

  private $class;

  public static function set($route, $className, $method, $auth = null){
    $current = Helpers::getCurrentRoute();
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