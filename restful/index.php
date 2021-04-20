<?php

header('Content-Type: application/json; charset=utf-8');

require_once ''.__DIR__.'/vendor/autoload.php';

$request = $_SERVER['REQUEST_URI'];
$req = preg_replace("/\/restful/", "", $request);
$req = preg_replace("/\?.+/", "", $req);

use \Controllers\PostsController;
use \Controllers\RegisterController;
use \Controllers\LoginController;
use \Controllers\ProjectsController;
use \Controllers\TasksController;

use \Core\Route;

Route::get('/', $req, PostsController::class, 'show', true);

Route::get('/register', $req, RegisterController::class, 'register');
Route::get('/login', $req, LoginController::class, 'login');

Route::get('/projects', $req, ProjectsController::class, 'show', true);
Route::get('/tasks', $req, TasksController::class, 'show', true);