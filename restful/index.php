<?php

header('Content-Type: application/json; charset=utf-8');

require_once ''.__DIR__.'/vendor/autoload.php';

use \Controllers\PostsController;
use \Controllers\RegisterController;
use \Controllers\LoginController;
use \Controllers\ProjectsController;
use \Controllers\TasksController;

use \Core\Route;

Route::get('/', PostsController::class, 'show', true);

Route::get('/register', RegisterController::class, 'register');
Route::get('/login', LoginController::class, 'login');

Route::get('/projects', ProjectsController::class, 'show', true);
Route::get('/tasks', TasksController::class, 'show', true);