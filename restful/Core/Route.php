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
          // setcookie('token', $_COOKIE['token'], time()+60*60, "/");
          $arr_cookie_options = array(
            'expires' => time() + 60 * 60,
            'path' => '/',
            'domain' => '', // leading dot for compatibility or use subdomain
            'secure' => false, // or false
            'httponly' => false, // or false
            'samesite' => 'Lax', // None || Lax  || Strict
        );
        setcookie('token', $_COOKIE['token'], $arr_cookie_options);
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