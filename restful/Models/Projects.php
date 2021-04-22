<?php

namespace Models;

use \Core\Query;

class Projects {

  public function getProjects()
  {

    return Query::select("*", "projects")->bind();

  }

}