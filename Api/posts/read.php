<?php

//header('Content-Type: application/json');
require_once '../../vendor/autoload.php';

use \Controllers\PostsController;

$api = new PostsController;

echo $api->response;
