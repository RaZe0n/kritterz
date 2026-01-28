<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('translations', function () {
            // Load a flat array of UI translations for the current locale.
            // You can organize these in resources/lang/{locale}/ui.php.
            $translations = Lang::get('ui');

            return is_array($translations) ? $translations : [];
        });
    }
}
