<?php

namespace Core;

class Controller {
  protected function view($path) {
    require_once '../Api/'.$path.'.php';
  }
}