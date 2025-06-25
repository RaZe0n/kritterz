<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArtworkController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $currentEvents = \App\Models\Event::current()->take(2)->get();
    $upcomingEvents = \App\Models\Event::upcoming()->take(2)->get();
    return Inertia::render('Index', [
        'currentEvents' => $currentEvents,
        'upcomingEvents' => $upcomingEvents
    ]);
})->name('home');

Route::get('/gallery', [ArtworkController::class, 'index'])->name('gallery');

Route::get('/exhibitions', [EventController::class, 'index'])->name('exhibitions');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

// API routes for artworks
Route::get('/api/artworks', [ArtworkController::class, 'getAll']);
Route::get('/api/artworks/for-sale', [ArtworkController::class, 'getForSale']);
Route::get('/api/artworks/sold', [ArtworkController::class, 'getSold']);

// API routes for tags
Route::get('/api/tags', [TagController::class, 'getAll']);

// API routes for events
Route::get('/api/events', [EventController::class, 'getAll']);
Route::get('/api/events/current', [EventController::class, 'getCurrent']);
Route::get('/api/events/upcoming', [EventController::class, 'getUpcoming']);
Route::get('/api/events/past', [EventController::class, 'getPast']);
Route::get('/api/events/homepage', [EventController::class, 'getForHomepage']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/gallery', [DashboardController::class, 'gallery'])->name('dashboard.gallery');
    Route::get('/dashboard/exhibitions', [DashboardController::class, 'exhibitions'])->name('dashboard.exhibitions');
    
    // Artwork CRUD routes
    Route::resource('dashboard/artworks', ArtworkController::class)->names([
        'index' => 'dashboard.artworks.index',
        'create' => 'dashboard.artworks.create',
        'store' => 'dashboard.artworks.store',
        'show' => 'dashboard.artworks.show',
        'edit' => 'dashboard.artworks.edit',
        'update' => 'dashboard.artworks.update',
        'destroy' => 'dashboard.artworks.destroy',
    ]);
    
    // Tag CRUD routes
    Route::resource('dashboard/tags', TagController::class)->names([
        'index' => 'dashboard.tags.index',
        'create' => 'dashboard.tags.create',
        'store' => 'dashboard.tags.store',
        'show' => 'dashboard.tags.show',
        'edit' => 'dashboard.tags.edit',
        'update' => 'dashboard.tags.update',
        'destroy' => 'dashboard.tags.destroy',
    ]);
    
    // Event CRUD routes
    Route::resource('dashboard/events', EventController::class)->names([
        'index' => 'dashboard.events.index',
        'create' => 'dashboard.events.create',
        'store' => 'dashboard.events.store',
        'show' => 'dashboard.events.show',
        'edit' => 'dashboard.events.edit',
        'update' => 'dashboard.events.update',
        'destroy' => 'dashboard.events.destroy',
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
