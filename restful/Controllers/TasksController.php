<?php

namespace Controllers;

use \Models\Tasks;
use \Core\Helpers;

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

            Helpers::response(204, ['message' => 'Nėra duomenų.']);

        } else {

            $this->data = $this->stmt->fetchAll(\PDO::FETCH_ASSOC);

            Helpers::response(200, $this->data);

        }
    }

}
