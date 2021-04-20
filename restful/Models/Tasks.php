<?php

namespace Models;

use \Core\Database;

class Tasks extends Database {

  public function getAllTasks($project_id) {

    $query = 'SELECT id FROM tasks WHERE project_id = :project_id';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":project_id", $project_id);
    $stmt->execute();

    return $stmt;

  }

  public function getCompletedTasks($project_id) {

    $query = 'SELECT id FROM tasks WHERE project_id = :project_id AND status = 1';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":project_id", $project_id);
    $stmt->execute();

    return $stmt;

  }

}