<?php

namespace Controllers;

use \Models\Projects;
use \Models\Tasks;

class ProjectsController {

  private $stmt;
  private $rows;
  private $data;

  public function show() {
    
    $projectsModel = new Projects;

    $this->stmt = $projectsModel->getProjects();

    $this->rows = $this->stmt->rowCount();
    
    if ($this->rows <= 0) {

      $this->response = json_encode(['message' => 'Nėra duomenų.']);

      echo $this->response;

      http_response_code(404);

    } else {

      $tasksModel = new Tasks;

      $this->data = $this->stmt->fetchAll(\PDO::FETCH_ASSOC);

      $updatedData = [];

      foreach ($this->data as $task) {
        $allTasks = $tasksModel->getAllTasks($task['id']);
        $doneTasks = $tasksModel->getCompletedTasks($task['id']);

        $task['total'] = $allTasks->rowCount();
        $task['total_done'] = $doneTasks->rowCount();

        array_push($updatedData, $task);
      }

      $this->response = json_encode($updatedData);
      
      echo $this->response;
      
      http_response_code(200);

    }

  }

}