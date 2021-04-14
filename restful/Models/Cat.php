<?php

namespace Models;

use \Core\Database;

class Cat extends Database {

  public function getCatsList() {

    $query = 'SELECT * FROM products0';

    $stmt = $this->connect()->prepare($query);
    //bind params
    $stmt->execute();

    return $stmt;

  }

}