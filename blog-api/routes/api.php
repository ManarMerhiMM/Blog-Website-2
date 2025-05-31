<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

Route::middleware(['api'])->group(function () {
    // Public routes
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'show']);

    // Protected routes (require auth)
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/posts', [PostController::class, 'store']);
        Route::put('/posts/{post}', [PostController::class, 'update']);
        Route::patch('/posts/{post}', [PostController::class, 'update']);
        Route::delete('/posts/{post}', [PostController::class, 'destroy']);

        Route::get('/users/{user}', [AuthController:: class, 'dashboard']);

        Route::post('/logout', [AuthController::class, 'logout']);
    });

    // Auth routes
    Route::middleware(['guestApi'])->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
    });
});
