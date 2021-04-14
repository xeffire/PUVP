<?php

namespace Core;

class Route {

  private $class;

  public static function get($route, $current, $className, $method){
    if ($route == $current) {
      
      $class = new $className;
      $class->$method();

    }
  }

}