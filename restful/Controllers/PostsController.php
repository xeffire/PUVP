<?php

namespace Controllers;

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