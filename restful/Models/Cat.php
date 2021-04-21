<?php

namespace Models;

use \Core\Query;

class Cat {

  public function getCatsList() {

    return Query::select("*", "products0", "price = :price")->bind([":price" => "345"]);

  }

}