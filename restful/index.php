<?php

header('Content-Type: application/json');

require_once ''.__DIR__.'/vendor/autoload.php';

$baseFolder = "\/restful";
$request = $_SERVER['REQUEST_URI'];
$req = preg_replace("/".$baseFolder."/", "", $request);

use \Controllers\PostsController;
use \Core\Route;

Route::get('/', $req, PostsController::class, 'show');
Route::get('/about', $req, PostsController::class, 'read');

//q
