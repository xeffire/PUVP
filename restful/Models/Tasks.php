<?php

namespace Models;

use \Core\Query;

class Tasks {

  public function getAllTasks($project_id)
  {

    return Query::select("*", "tasks", "project_id = :project_id")
    ->bind([":project_id" => $project_id]);

  }

  public function getTasks($project_id, $select)
  {

    return Query::select($select, "tasks", "project_id = :project_id")
    ->bind([":project_id" => $project_id]);

  }

  public function getCompletedTasks($project_id) {

    return Query::select("id", "tasks", "project_id = :project_id AND status = 1")
    ->bind([":project_id" => $project_id]);

  }

}