<?php

//require_once '../../core/Query.php';

namespace Models;

use \Core\Model;
use \Core\Query;

class Cat extends Model {

  public function getCats() {

    // $data = [
    //   'vardas' => 'Mieliukas',
    //   'pavarde' => 'Mieliausias',
    //   'amzius' => '14'
    // ];
    // $query = Query::INSERT('katinas', $data);

    $query = Query::SELECT('*', 'katinas');

    $stmt = $this->sql->prepare($query);
    $stmt->execute();

    return $stmt;
  }

}