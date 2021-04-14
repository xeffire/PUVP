<?php

namespace Core;

use \Core\Database;

class Model {
  private $sql;

  public function __construct() {
    $this->sql = Database::connect();
  }
}