<?php

/**
 * Translation script using DeepL API
 * 
 * Usage: php translate-lang-files.php
 * 
 * Requires DEEPL_API_KEY environment variable or set it below
 */

require __DIR__ . '/vendor/autoload.php';

$apiKey = getenv('DEEPL_API_KEY') ?: 'YOUR_DEEPL_API_KEY_HERE';

if ($apiKey === 'YOUR_DEEPL_API_KEY_HERE') {
    die("Please set DEEPL_API_KEY environment variable or edit this script.\n");
}

// Load English translations
$enFile = __DIR__ . '/resources/lang/en/ui.php';
$enTranslations = require $enFile;

// Target languages
$targetLanguages = [
    'de' => 'DE',
    'fr' => 'FR',
    'es' => 'ES',
];

// DeepL API endpoint
$apiUrl = 'https://api-free.deepl.com/v2/translate';

foreach ($targetLanguages as $locale => $deeplCode) {
    echo "Translating to {$locale}...\n";
    
    $translated = [];
    
    foreach ($enTranslations as $key => $value) {
        // Skip comments
        if (is_string($key) && strpos($key, '//') === 0) {
            continue;
        }
        
        // Translate the value
        $data = [
            'auth_key' => $apiKey,
            'text' => $value,
            'source_lang' => 'EN',
            'target_lang' => $deeplCode,
            'preserve_formatting' => '1',
        ];
        
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/x-www-form-urlencoded',
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $result = json_decode($response, true);
            if (isset($result['translations'][0]['text'])) {
                $translated[$key] = $result['translations'][0]['text'];
                echo "  ✓ {$key}\n";
            } else {
                $translated[$key] = $value; // Fallback to English
                echo "  ✗ {$key} (using English)\n";
            }
        } else {
            echo "  ✗ Error translating {$key}: HTTP {$httpCode}\n";
            $translated[$key] = $value; // Fallback to English
        }
        
        // Small delay to respect rate limits
        usleep(100000); // 0.1 second
    }
    
    // Generate PHP file content
    $output = "<?php\n\nreturn [\n";
    
    // Group by section
    $sections = [];
    foreach ($translated as $key => $value) {
        $parts = explode('.', $key);
        $section = $parts[0];
        if (!isset($sections[$section])) {
            $sections[$section] = [];
        }
        $sections[$section][$key] = $value;
    }
    
    foreach ($sections as $section => $keys) {
        $output .= "    // " . ucfirst($section) . "\n";
        foreach ($keys as $key => $value) {
            $escaped = addslashes($value);
            $output .= "    '{$key}' => '{$escaped}',\n";
        }
        $output .= "\n";
    }
    
    $output .= "];\n";
    
    // Write file
    $outputFile = __DIR__ . "/resources/lang/{$locale}/ui.php";
    file_put_contents($outputFile, $output);
    
    echo "✓ Saved to {$outputFile}\n\n";
}

echo "Translation complete!\n";
