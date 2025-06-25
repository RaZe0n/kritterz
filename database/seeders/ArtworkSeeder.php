<?php

namespace Database\Seeders;

use App\Models\Artwork;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class ArtworkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $artworks = [
            [
                'title' => 'Silverware Symphony',
                'image' => '/storage/images/f19e1a27-d00f-4536-978b-afa078339104 2.JPG',
                'description' => 'A harmonious blend of vintage forks and spoons',
                'status' => 'for sale',
                'tags' => ['Vogels', 'Insecten']
            ],
            [
                'title' => 'Cutlery Canvas',
                'image' => '/storage/images/f7a52b40-a72e-4193-97ba-91b69c52c671 2.JPG',
                'description' => 'Where dining meets design',
                'status' => 'sold',
                'tags' => ['Hangers', 'Bloemen']
            ],
            [
                'title' => 'Table Tales',
                'image' => '/storage/images/f2c2d198-f9ea-4511-8017-98666abe2c1e 2.JPG',
                'description' => 'Stories told through silver',
                'status' => 'for sale',
                'tags' => ['Zoogdieren', 'Insecten']
            ],
            [
                'title' => 'Fork Fusion',
                'image' => '/storage/images/ea46a11b-606c-4314-b6b7-13c85037a7c4 2.JPG',
                'description' => 'Modern art meets traditional dining',
                'status' => 'sold',
                'tags' => ['Vogels', 'Insecten']
            ],
            [
                'title' => 'Spoon Stories',
                'image' => '/storage/images/e3a0e577-8c01-47ab-8f89-6f36f9e2c0cf 2.JPG',
                'description' => 'Each piece tells a unique tale',
                'status' => 'for sale',
                'tags' => ['Hangers', 'Bloemen']
            ],
            [
                'title' => 'Silver Sculptures',
                'image' => '/storage/images/bf054056-87eb-46a6-b33c-36012ddef79f 2.JPG',
                'description' => 'Transforming everyday objects into art',
                'status' => 'for sale',
                'tags' => ['Zoogdieren', 'Insecten']
            ],
            [
                'title' => 'Dining Dreams',
                'image' => '/storage/images/b3a531e8-665d-4447-97e9-f1b677d55595 2.JPG',
                'description' => 'Where culinary meets creativity',
                'status' => 'sold',
                'tags' => ['Vogels', 'Insecten']
            ],
            [
                'title' => 'Metallic Memories',
                'image' => '/storage/images/a2fc32d3-065b-4f17-b0f2-6ec1d62b2e21 2.JPG',
                'description' => 'Preserving history through art',
                'status' => 'for sale',
                'tags' => ['Hangers', 'Bloemen']
            ],
            [
                'title' => 'Cutlery Collection',
                'image' => '/storage/images/7a7d4a6d-58f7-4dd6-a0a7-791230a58464 2.JPG',
                'description' => 'A celebration of form and function',
                'status' => 'for sale',
                'tags' => ['Zoogdieren', 'Insecten']
            ]
        ];

        foreach ($artworks as $artworkData) {
            $tags = $artworkData['tags'];
            unset($artworkData['tags']);
            
            $artwork = Artwork::create($artworkData);
            
            // Attach tags to the artwork
            foreach ($tags as $tagName) {
                $tag = Tag::where('name', $tagName)->first();
                if ($tag) {
                    $artwork->tags()->attach($tag->id);
                }
            }
        }
    }
} 