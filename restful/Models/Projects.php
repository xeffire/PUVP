<?php

namespace Models;

use \Core\Query;
use \Core\Database;

class Projects extends Database {

  public function getProjects()
  {

    return Query::select("*", "projects")->bind();

  }

  public function countProjectsById($id) {

    $answer = Query::select("COUNT(*)", "projects", "id = :id")->bind([":id" => $id]);
    
    return $answer->fetchColumn();
    
  }

  public function create($name, $description) {

    $query = "INSERT INTO projects (name, description) VALUES(:name, :description)";

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->execute();

    return $stmt;

  }

  public function deleteById($id) {

      
    $query = "DELETE a.*, b.* FROM projects a LEFT JOIN tasks b ON b.project_id = a.id WHERE a.id = :id";
    
    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    
    return $stmt;
    
  }

}