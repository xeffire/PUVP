<?php

namespace Controllers;

use \Core\Controller;
use \Models\Cat;

class PostsController extends Controller {
  
  public $response;

  public function __construct() {

    $cats = new Cat();


    $result = $cats->getCats();
    
    $rows = $result->rowCount();
    
    if ($rows <= 0) {
      $this->response = json_encode(['message' => 'Nėra duomenų.']);
    } else {
      $data = $result->fetchAll(\PDO::FETCH_ASSOC);
      $this->response = json_encode($data);
    }
  }

}