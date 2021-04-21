<?php

namespace Core;

use \Core\Database;

class Query extends Database {

  private static $query;

  public static function select($select, $from, $where)
  {
    
    self::$query = "SELECT {$select} FROM {$from} WHERE {$where} ";

    return new self;
  
  }

  public function bind($binds)
  {

    $stmt = $this->connect()->prepare(self::$query);

    foreach($binds as $key => $value)
    {
      $stmt->bindParam("{$key}", $value);
    }

    $stmt->execute();

    return $stmt;

  }

}

