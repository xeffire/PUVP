<?php

namespace Core;

use \PDO;
use \PDOException;

class Database {
  private static $host;
  private static $dbname = 'goislt_goislt';
  private static $user = 'goislt_puvp';
  private static $pwd = 'projektasprojektas';
  private static $sql;

  public static function connect() {
    self::$sql = null;

    if ($_SERVER['SERVER_ADDR'] == "79.98.25.23") {
      self::$host = "localhost";
    } else {
      self::$host = "jautis.serveriai.lt";
    }

    try {

      self::$sql = new PDO("mysql:host=".self::$host.";dbname=".self::$dbname.";charset=UTF8", self::$user, self::$pwd);

      self::$sql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      //echo 'connection success';

    } catch(PDOException $e) {

      echo "Error: " . $e->getMessage();
    
    }

    return self::$sql;
  }

}
