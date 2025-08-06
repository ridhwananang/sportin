<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\SportController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'role:super_admin,admin'])->group(function () {
    Route::resource('areas', AreaController::class);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/sports', [SportController::class, 'index'])->name('sports.index');

    Route::middleware('role:super_admin,admin')->group(function () {
        Route::get('/sports/create', [SportController::class, 'create'])->name('sports.create');
        Route::post('/sports', [SportController::class, 'store'])->name('sports.store');
        Route::get('/sports/{sport}/edit', [SportController::class, 'edit'])->name('sports.edit');
        Route::put('/sports/{sport}', [SportController::class, 'update'])->name('sports.update');
        Route::delete('/sports/{sport}', [SportController::class, 'destroy'])->name('sports.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
