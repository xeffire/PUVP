<?php

header('Content-Type: application/json; charset=utf-8');

require_once ''.__DIR__.'/vendor/autoload.php';

// $baseFolder = "\/restful"; // jeigu kelias iki folderio be papildomu subfolderiu
$baseFolder = "\/PUVP\/restful";
$request = $_SERVER['REQUEST_URI'];
$req = preg_replace("/".$baseFolder."/", "", $request);

use \Controllers\PostsController;
use \Controllers\RegisterController;
use \Controllers\LoginController;
use \Core\Route;

Route::get('/', $req, PostsController::class, 'show');
Route::get('/register', $req, RegisterController::class, 'register');
Route::get('/login', $req, LoginController::class, 'login');
