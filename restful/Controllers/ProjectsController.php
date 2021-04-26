<?php

namespace Controllers;

use \Core\Helpers;
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

      Helpers::response(204, ["response" => "Nėra duomenų."]);

    } else {

      $tasksModel = new Tasks;

      $this->data = $this->stmt->fetchAll(\PDO::FETCH_ASSOC);

      $updatedData = [];

      foreach ($this->data as $task) {
        $allTasks = $tasksModel->getTasks($task['id'], "id");
        $doneTasks = $tasksModel->getCompletedTasks($task['id']);

        $task['total'] = $allTasks->rowCount();
        $task['total_done'] = $doneTasks->rowCount();

        array_push($updatedData, $task);
      }

      Helpers::response(200, $updatedData);

    }

  }

  public function create() {

    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $description = isset($_POST['description']) ? $_POST['description'] : null;
  
    $projectsModel = new Projects;

    $e = [];

    if (empty($name) || empty($description)) {
      $e[1] = "Palikote tuščią laukelį.";
    }

    if (!empty($name) && !empty($description) && strlen($name) < 5) {
      $e[2] = "Projekto pavadinimas per trumpas.";
    }
    
    if (!empty($name) && !empty($description) && strlen($description) < 10) {
      $e[3] = "Projekto aprašymas per trumpas.";
    }



    if (!empty($e)) {

      Helpers::response(400, $e);

    } else {

      $projectsModel->create($name, $description);

      Helpers::response(200, ["response"=>"Projektas sėkmingai sukurtas."]);

    }


  }

  public function delete() {

    if (isset($_GET)) {
    
      $projectsModel = new Projects;
    
      $id = isset($_GET['id']) ? $_GET['id'] : null;
      
      $e = [];
    
      if (empty($id)) {
        $e[1] = "Nepasirinkote kurį projektą norite ištrinti.";
      }
    
      if (!empty($id) && $projectsModel->countProjectsById($id) <= 0) {
        $e[2] = "Projektas neegzistuoja.";
      }
    
      if (!empty($e)) {
    
        Helpers::response(400, $e);
    
      } else {
    
        $projectsModel->deleteById($id);
    
        Helpers::response(200, ["response" => "Projektas ištrintas."]);
    
      }
    
    }
  }

  public function update() {

    if (isset($_GET) && isset($_POST)) {
    
      $projectsModel = new Projects;
    
      $id = isset($_GET['id']) ? $_GET['id'] : null;
      $name = isset($_POST['name']) ? $_POST['name'] : null;
      $description = isset($_POST['description']) ? $_POST['description'] : null;
      
      $e = [];
    
      if (empty($id)) {
        $e[1] = "Nepasirinkote kurį projektą norite ištrinti.";
      }
    
      if (!empty($id) && $projectsModel->countProjectsById($id) <= 0) {
        $e[2] = "Projektas neegzistuoja.";
      }

      if (empty($name) || empty($description)) {
        $e[1] = "Palikote tuščią laukelį.";
      }
  
      if (!empty($name) && !empty($description) && strlen($name) < 5) {
        $e[2] = "Projekto pavadinimas per trumpas.";
      }
      
      if (!empty($name) && !empty($description) && strlen($description) < 10) {
        $e[3] = "Projekto aprašymas per trumpas.";
      }
    
      if (!empty($e)) {
    
        Helpers::response(400, $e);
    
      } else {
    
        $projectsModel->updateById($id, $name, $description);
    
        Helpers::response(200, ["response" => "Projektas atnaujintas."]);
    
      }
    
    }
  }

}