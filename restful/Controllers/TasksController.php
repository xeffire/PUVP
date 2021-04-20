<?php

namespace Controllers;

use \Models\Tasks;

class TasksController
{

    private $stmt;
    private $rows;
    private $data;

    public function show()
    {
        echo 'validation happens here';

        $project_id = $_GET['id'];


        $tasksModel = new Tasks;

        $this->stmt = $tasksModel->getAllTasks($project_id);

        $this->rows = $this->stmt->rowCount();

        if ($this->rows <= 0) {

            $this->response = json_encode(['message' => 'Nėra duomenų.']);

            echo $this->response;

            http_response_code(404);

        } else {

            $this->data = $this->stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->response = json_encode($this->data);

            echo $this->response;

            http_response_code(200);

        }
    }

}
