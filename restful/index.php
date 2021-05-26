<?php

header('Content-Type: application/json; charset=utf-8');

ini_set('date.timezone', 'Europe/Vilnius');

require_once '' . __DIR__ . '/vendor/autoload.php';

use \Controllers\LoginController;
use \Controllers\PostsController;
use \Controllers\ProjectsController;
use \Controllers\RegisterController;
use \Controllers\TasksController;
use \Controllers\UserController;
use \Core\Route;

Route::set('/', PostsController::class, 'show', true);

Route::set('/register', RegisterController::class, 'register');
Route::set('/login', LoginController::class, 'login');

Route::set('/user', UserController::class, 'info', true);
Route::set('/logout', UserController::class, 'logout', true);

Route::set('/projects/create', ProjectsController::class, 'create', true);
Route::set('/projects', ProjectsController::class, 'show', true);
Route::set('/projects/update', ProjectsController::class, 'update', true);
Route::set('/projects/delete', ProjectsController::class, 'delete', true);

Route::set('/tasks/create', TasksController::class, 'create', true);
Route::set('/tasks', TasksController::class, 'show', true);
Route::set('/tasks/update', TasksController::class, 'update', true);
Route::set('/tasks/delete', TasksController::class, 'delete', true);

Route::set('/projectname', ProjectsController::class, 'getNameByIndex', true);
