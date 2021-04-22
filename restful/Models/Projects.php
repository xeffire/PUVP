<?php

namespace Models;

use \Core\Query;
use \Core\Database;

class Projects extends Database {

  public function getProjects()
  {

    return Query::select("*", "projects")->bind();

  }

  public function create($name, $description) {

    $query = "INSERT INTO projects (name, description) VALUES(:name, :description)";

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->execute();

    return $stmt;

  }

}