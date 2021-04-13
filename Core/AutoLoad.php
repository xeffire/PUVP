<?php

spl_autoload_register(function ($class) {
  if (file_exists('../../core/'.$class.'.php')) {
    require_once '../../core/'.$class.'.php';
  }
  
  if (file_exists('../../models/'.$class.'.php')) {
    require_once '../../models/'.$class.'.php';
  }

});

