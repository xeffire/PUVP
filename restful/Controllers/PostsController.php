<?php

namespace Controllers;

use \Core\Helpers;
use \Models\Cat;

class PostsController {
  
  public $data;
  public $response;
  public $rows;
  public $stmt;

  public function show() {
    $cat = new Cat;

    $this->stmt = $cat->getCatsList();

    $this->rows = $this->stmt->rowCount();
    
    if ($this->rows <= 0) {

      Helpers::response(404, ['message' => 'Nėra duomenų.']);

    } else {

      $this->data = $this->stmt->fetchAll(\PDO::FETCH_ASSOC);

      Helpers::response(200, $this->data);

    }
  }

  public function read() {
    http_response_code(200);
    echo json_encode(
      [
        "message" => "hi",
        "cat" => "john"
      ]
    );
  }

}