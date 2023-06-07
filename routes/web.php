<?php

use App\Http\Controllers\User\Dashboard;
use App\Http\Controllers\User\Dashboard\MovieController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\SubscriptionPlanController;
use App\Http\Controllers\Admin\MovieController as AdminMovieController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// test spatie role
// Route::get('admin', fn () => 'Hi admin')->middleware('role:admin');
// Route::get('user', function () {
//     return 'Hi user';
// })->middleware('role:user');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::redirect('/', '/login');

// user
Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubscription:true');
    Route::get('subscription-plan', [SubscriptionPlanController::class, 'index'])->name('subscriptionPlan')->middleware('checkUserSubscription:false');
    Route::post('subscription-plan/{subscriptionPlan}/user-subscribe', [SubscriptionPlanController::class, 'userSubscribe'])->name('subscriptionPlan.userSubscribe')->middleware('checkUserSubscription:false');
});

// admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.dashboard.')->group(function () {
    Route::put('movie/{movie}/restore', [AdminMovieController::class, 'restore'])->name('movie.restore');
    Route::resource('movie', AdminMovieController::class);
});
// Untuk render react di folder Prototype
// Folder react ada di folder resources/js
Route::prefix('prototype')->name('prototype.')->group(function () {
    route::get('/login', function () {
        return Inertia::render('Prototype/Login');
    })->name('login');

    route::get('/register', function () {
        return Inertia::render('Prototype/Register');
    })->name('register');
    route::get('/dashboard', function () {
        return Inertia::render('Prototype/Dashboard');
    })->name('dashboard');
    route::get('/subscriptionPlan', function () {
        return Inertia::render('Prototype/SubscriptionPlan');
    })->name('subscriptionPlan');
    route::get('/movie/{slug}', function () {
        return Inertia::render('Prototype/Movie/Show');
    })->name('movie.show');
});

require __DIR__ . '/auth.php';
