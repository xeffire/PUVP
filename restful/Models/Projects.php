<?php

namespace Models;

use \Core\Database;

class Projects extends Database {

  public function getProjects() {

    $query = 'SELECT * FROM projects';

    $stmt = $this->connect()->prepare($query);
    $stmt->execute();

    return $stmt;

  }

}