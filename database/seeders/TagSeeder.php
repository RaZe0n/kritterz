<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Vogels',
                'color' => '#3B82F6',
                'description' => 'Abstract and non-representational art',
            ],
            [
                'name' => 'Insecten',
                'color' => '#10B981',
                'description' => 'Natural landscapes and scenery',
            ],
            [
                'name' => 'Hangers',
                'color' => '#F59E0B',
                'description' => 'Human portraits and figures',
            ],
            [
                'name' => 'Bloemen',
                'color' => '#8B5CF6',
                'description' => 'Inanimate objects and compositions',
            ],
            [
                'name' => 'Zoogdieren',
                'color' => '#EF4444',
                'description' => 'Contemporary and modern art styles',
            ],
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
