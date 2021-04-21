<?php

namespace Core;

class Helpers {
  
  public static function response($res_code, $res_array) {
    
    http_response_code($res_code);

    echo json_encode($res_array);
    
  }

  public static function getCurrentRoute() {
    $request = $_SERVER['REQUEST_URI'];
    $req = preg_replace("/\/restful/", "", $request);
    $req = preg_replace("/\?.+/", "", $req);
    return $req;
  }

}