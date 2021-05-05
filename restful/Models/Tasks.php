<?php

namespace Models;

use \Core\Query;
use \Core\Database;

class Tasks extends Database {

  public function getAllTasks($project_id)
  {
    // return Query::select("*", "tasks", "project_id = :project_id")
    // ->bind([":project_id" => $project_id]);

    $query = "SELECT tasks.*, projects.name AS project_name FROM tasks JOIN projects ON tasks.project_id = projects.id WHERE tasks.project_id = :project_id ORDER BY tasks.priority DESC";

    $stmt = $this->connect()->prepare($query);

    $stmt->bindParam(":project_id", $project_id);

    $stmt->execute();

    return $stmt;
  }

  public function getTasks($project_id, $select)
  {
    return Query::select($select, "tasks", "project_id = :project_id")
    ->bind([":project_id" => $project_id]);
  }

  public function getCompletedTasks($project_id)
  {
    return Query::select("id", "tasks", "project_id = :project_id AND (status = 1 OR status = 0)")
    ->bind([":project_id" => $project_id]);
  }

  public function addTaskToProjectById($id, $name, $description, $priority)
  {  
    $query = 'INSERT INTO tasks (project_id, name, description, priority) VALUES (:id, :name, :description, :priority)';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":priority", $priority);
    $stmt->execute();
  }

  public function countTasksById($id)
  {
    $stmt = Query::select("COUNT(*)", "tasks", "id = :id")->bind([":id" => $id]);
    $rows = $stmt->fetchColumn();

    return $rows;
  }

  public function deleteTaskById($id)
  {
    $query = 'DELETE FROM tasks WHERE id = :id';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
  }
  
  public function updateTaskById($id, $name, $description, $status, $priority, $updatedAt)
  {
    $query = 'UPDATE tasks SET name = :name, description = :description, status = :status, priority = :priority, updated = :updated WHERE id = :id';

    $stmt = $this->connect()->prepare($query);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":description", $description);
    $stmt->bindParam(":status", $status);
    $stmt->bindParam(":priority", $priority);
    $stmt->bindParam(":updated", $updatedAt);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
  }

}