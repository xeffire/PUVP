<?php

namespace Core;

use \PDO;
use \PDOException;

class Database {
  private static $host = 'localhost';
  private static $dbname = 'app';
  private static $user = 'root';
  private static $pwd = '';
  private static $sql;

  public static function connect() {
    self::$sql = null;

    try {

      self::$sql = new PDO("mysql:host=".self::$host.";dbname=".self::$dbname."", self::$user, self::$pwd);

      self::$sql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      //echo 'connection success';

    } catch(PDOException $e) {

      echo "Error: " . $e->getMessage();
    
    }

    return self::$sql;
  }

}
