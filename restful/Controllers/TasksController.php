<?php

namespace Controllers;

use \Core\Helpers;
use \Models\Tasks;
use \Models\Projects;

class TasksController
{

    public function show()
    {
        if (isset($_GET)) {

            $project_id = isset($_GET['id']) ? $_GET['id'] : null;

            $projectsModel = new Projects;

            $e = [];

            if (empty($project_id)) {
                $e[1] = "Nepasirinkote projekto.";
            }

            if (!empty($project_id) && $projectsModel->countProjectsById($project_id) <= 0) {
                $e[2] = "Projektas neegzistuoja.";
            }

            if (!empty($e)) {

                Helpers::response(400, $e);

            } else {

                $tasksModel = new Tasks;

                $stmt = $tasksModel->getAllTasks($project_id);

                $rows = $stmt->rowCount();

                if ($rows <= 0) {

                    Helpers::response(204, []);

                } else {

                    $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                    Helpers::response(200, $data);

                }

            }
        }
    }

    public function create()
    {
        if (isset($_GET) && isset($_POST)) {

            $projectsModel = new Projects;

            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $name = isset($_POST['name']) ? $_POST['name'] : null;
            $description = isset($_POST['description']) ? $_POST['description'] : null;
            $priority = isset($_POST['priority']) ? $_POST['priority'] : null;

            $e = [];

            if (empty($id)) {
                $e[1] = "Nepasirinkote kuriam projektui kuriate užduotį.";
            }

            if (!empty($id) && $projectsModel->countProjectsById($id) <= 0) {
                $e[2] = "Projektas neegzistuoja.";
            }

            if (empty($name) || empty($description) || empty($priority)) {
                $e[3] = "Palikote tuščią laukelį.";
            }

            if (!empty($name) && !empty($description) && strlen($name) < 5) {
                $e[4] = "Užduoties pavadinimas per trumpas.";
            }
              
            if (!empty($name) && !empty($description) && strlen($description) < 10) {
                $e[5] = "Užduoties aprašymas per trumpas.";
            }

            if (!empty($e)) {

                Helpers::response(400, $e);

            } else {

                $tasksModel = new Tasks;

                $tasksModel->addTaskToProjectById($id, $name, $description, $priority);

                Helpers::response(200, ["response" => "Užduotis sėkmingai sukurta."]);

            }

        }
    }

    public function delete()
    {
        if (isset($_GET)) {

            $id = isset($_GET['id']) ? $_GET['id'] : null;

            $tasksModel = new Tasks;

            $e = [];

            if (empty($id)) {
                $e[1] = "Nepasirinkote kurią užduotį norite ištrinti.";
            }

            if (!empty($id) && $tasksModel->countTasksById($id) <= 0) {
                $e[2] = "Užduotis neegzistuoja.";
            }

            if (!empty($e)) {

                Helpers::response(400, $e);

            } else {

                $tasksModel->deleteTaskById($id);

                Helpers::response(200, ["response" => "Užduotis ištrinta."]);

            }

        }
    }

    public function update()
    {
        if (isset($_GET) && isset($_POST))
        {
            $id = isset($_GET['id']) ? $_GET['id'] : null;
            $name = isset($_POST['name']) ? $_POST['name'] : null;
            $description = isset($_POST['description']) ? $_POST['description'] : null;
            $status = isset($_POST['status']) ? $_POST['status'] : null;
            $priority = isset($_POST['priority']) ? $_POST['priority'] : null;

            $tasksModel = new Tasks;

            $e = [];

            if (empty($id)) {
                $e[1] = "Nepasirinkote kurią užduotį atnaujinsite.";
            }

            if (!empty($id) && $tasksModel->countTasksById($id) <= 0) {
                $e[2] = "Užduotis neegzistuoja.";
            }

            if (empty($name) || empty($description) || empty($status) || empty($priority) ) {
                $e[3] = "Palikote tuščią laukelį.";
            }

            if (!empty($name) && !empty($description) && strlen($name) < 5) {
                $e[4] = "Užduoties pavadinimas per trumpas.";
            }
              
            if (!empty($name) && !empty($description) && strlen($description) < 10) {
                $e[5] = "Užduoties aprašymas per trumpas.";
            }

            if (!empty($e)) {

                Helpers::response(400, $e);

            } else {
            
                $tasksModel->updateTaskById($id, $name, $description, $status, $priority, date('Y-m-d H:i:s'));

                Helpers::response(200, ["response" => "Užduotis atnaujinta."]);

            }

        }
    }

}
