<?php

namespace Core;

use \Core\Database;

class Model {
  public $sql;

  public function __construct() {
    $this->sql = Database::connect();
  }
}