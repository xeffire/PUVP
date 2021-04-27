<?php

header('Content-Type: application/json; charset=utf-8');

require_once ''.__DIR__.'/vendor/autoload.php';

use \Controllers\PostsController;
use \Controllers\RegisterController;
use \Controllers\LoginController;
use \Controllers\ProjectsController;
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

// Route::set('/tasks', TasksController::class, 'show', true);