<?php

namespace Core;

use \Core\Database;

class Query extends Database {

  private static $query;

  public static function select($select, $from, $where = null)
  {
    
    $whereCheck = ($where != null) ? "WHERE {$where}" : "";

    self::$query = 
    "SELECT {$select} FROM {$from} {$whereCheck}";

    return new self;
  
  }

  public function bind($binds = null)
  {

    $stmt = $this->connect()->prepare(self::$query);

    if ($binds != null) {
      foreach($binds as $key => $value)
      {
        $stmt->bindParam("{$key}", $value);
      }
    }

    $stmt->execute();

    return $stmt;

  }

}

