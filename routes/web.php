<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SportController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;

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

    // Semua user bisa lihat daftar dan detail olahraga
    Route::get('/sports', [SportController::class, 'index'])->name('sports.index');
    Route::get('/sports/create', [SportController::class, 'create'])->name('sports.create');
    Route::get('/sports/{sport}', [SportController::class, 'show'])->name('sports.show');

    // Hanya super_admin yang bisa CRUD
    Route::middleware('role:super_admin')->group(function () {

        Route::post('/sports', [SportController::class, 'store'])->name('sports.store');
        Route::get('/sports/{sport}/edit', [SportController::class, 'edit'])->name('sports.edit');
        Route::put('/sports/{sport}', [SportController::class, 'update'])->name('sports.update');
        Route::delete('/sports/{sport}', [SportController::class, 'destroy'])->name('sports.destroy');
    });
});

Route::middleware(['auth', 'role:super_admin'])->group(function () {
    Route::resource('users', UserController::class);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('bookings', BookingController::class)->except(['store']);
    Route::post('/sports/{sport}/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/sports/{sport}/bookings/create', [BookingController::class, 'create'])->name('bookings.create');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/bookings/{booking}/payment/create', [PaymentController::class, 'create'])->name('payments.create');
    Route::post('/bookings/{booking}/payment', [PaymentController::class, 'store'])->name('payments.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
