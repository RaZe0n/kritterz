<?php

return [
    // Default UI/content language
    'default' => env('APP_LOCALE', 'nl'),
    'fallback' => env('APP_FALLBACK_LOCALE', 'en'),
    // Order here also controls default in some client-side helpers
    'supported' => ['nl', 'en', 'de', 'fr', 'es'],
];

