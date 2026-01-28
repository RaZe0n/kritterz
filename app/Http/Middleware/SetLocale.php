<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $supported = config('locales.supported', ['nl', 'en', 'de', 'fr', 'es']);
        $default = config('locales.default', 'nl');

        $locale = $request->route('locale');

        if (! $locale || ! in_array($locale, $supported, true)) {
            // If the locale is missing or invalid, redirect to the same path with the default locale.
            $path = ltrim($request->getPathInfo(), '/');

            // Remove a potential leading invalid locale segment before redirecting.
            $segments = explode('/', $path);
            if (! empty($segments[0]) && ! in_array($segments[0], $supported, true)) {
                // Keep the rest of the path
                $path = implode('/', array_slice($segments, 1));
            }

            $redirectTo = '/' . $default . ($path ? '/' . $path : '');

            return redirect()->to($redirectTo);
        }

        App::setLocale($locale);

        return $next($request);
    }
}

