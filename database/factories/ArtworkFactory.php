<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Artwork>
 */
class ArtworkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Silver Symphony', 'Metallic Dreams', 'Fork Fantasia', 'Spoon Stories',
            'Cutlery Canvas', 'Table Tales', 'Dining Art', 'Silver Sculptures',
            'Metallic Memories', 'Culinary Creations', 'Fork Fusion', 'Spoon Serenade'
        ];

        $descriptions = [
            'A harmonious blend of vintage dining utensils',
            'Where culinary meets creativity',
            'Transforming everyday objects into art',
            'Each piece tells a unique tale',
            'Modern art meets traditional dining',
            'Preserving history through silver',
            'A celebration of form and function',
            'Stories told through metallic art',
            'Where dining meets design',
            'Contemporary silverware sculptures'
        ];

        return [
            'title' => $this->faker->randomElement($titles),
            'description' => $this->faker->randomElement($descriptions),
            'image' => '/storage/images/' . $this->faker->uuid . '.jpg',
            'status' => $this->faker->randomElement(['for sale', 'sold']),
        ];
    }
}
