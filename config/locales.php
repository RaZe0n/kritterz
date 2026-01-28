<?php

return [
    // Default UI/content language - always NL regardless of .env
    'default' => 'nl',
    'fallback' => env('APP_FALLBACK_LOCALE', 'en'),
    // Order here also controls default in some client-side helpers
    'supported' => ['nl', 'en', 'de', 'fr', 'es'],
];

